-- Amoeba SaaS: logical schemas, tenant-scoped tables, RLS
-- Apply via Supabase SQL editor or `supabase db push` after linking the project.

CREATE SCHEMA IF NOT EXISTS common;
CREATE SCHEMA IF NOT EXISTS meeting;
CREATE SCHEMA IF NOT EXISTS accounting;

-- ----- common.tenants -----
CREATE TABLE IF NOT EXISTS common.tenants (
  tenant_id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now ()
);

-- ----- common.profiles (maps auth.users to tenant-scoped profile rows) -----
CREATE TABLE IF NOT EXISTS common.profiles (
  tenant_id uuid NOT NULL REFERENCES common.tenants (tenant_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now (),
  updated_at timestamptz NOT NULL DEFAULT now (),
  PRIMARY KEY (tenant_id, user_id)
);

-- ----- common.tenant_memberships -----
CREATE TABLE IF NOT EXISTS common.tenant_memberships (
  tenant_id uuid NOT NULL REFERENCES common.tenants (tenant_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now (),
  PRIMARY KEY (tenant_id, user_id)
);

CREATE INDEX IF NOT EXISTS tenant_memberships_user_idx ON common.tenant_memberships (user_id);

-- ----- meeting.meeting_sessions (placeholder) -----
CREATE TABLE IF NOT EXISTS meeting.meeting_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  tenant_id uuid NOT NULL REFERENCES common.tenants (tenant_id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now ()
);

CREATE INDEX IF NOT EXISTS meeting_sessions_tenant_idx ON meeting.meeting_sessions (tenant_id);

-- ----- accounting tables (placeholder) -----
CREATE TABLE IF NOT EXISTS accounting.cost_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  tenant_id uuid NOT NULL REFERENCES common.tenants (tenant_id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now ()
);

CREATE INDEX IF NOT EXISTS cost_centers_tenant_idx ON accounting.cost_centers (tenant_id);

CREATE TABLE IF NOT EXISTS accounting.journal_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  tenant_id uuid NOT NULL REFERENCES common.tenants (tenant_id) ON DELETE CASCADE,
  amount numeric(18, 2) NOT NULL,
  memo text,
  created_at timestamptz NOT NULL DEFAULT now ()
);

CREATE INDEX IF NOT EXISTS journal_lines_tenant_idx ON accounting.journal_lines (tenant_id);

-- ----- RLS -----
ALTER TABLE common.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE common.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE common.tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting.meeting_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting.cost_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting.journal_lines ENABLE ROW LEVEL SECURITY;

-- Helper: tenants visible to the current user via membership
CREATE OR REPLACE FUNCTION common.user_tenant_ids ()
  RETURNS SETOF uuid
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = ''
AS $$
  SELECT tm.tenant_id
  FROM common.tenant_memberships AS tm
  WHERE tm.user_id = (SELECT auth.uid ());
$$;

REVOKE ALL ON FUNCTION common.user_tenant_ids () FROM PUBLIC;
GRANT EXECUTE ON FUNCTION common.user_tenant_ids () TO authenticated;
GRANT EXECUTE ON FUNCTION common.user_tenant_ids () TO service_role;

-- Optional stricter helper: active tenant from JWT app_metadata (set server-side when switching tenant)
CREATE OR REPLACE FUNCTION common.jwt_active_tenant_id ()
  RETURNS uuid
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = ''
AS $$
  SELECT NULLIF (
    current_setting ('request.jwt.claims', true)::json -> 'app_metadata' ->> 'active_tenant_id',
    ''
  )::uuid;
$$;

REVOKE ALL ON FUNCTION common.jwt_active_tenant_id () FROM PUBLIC;
GRANT EXECUTE ON FUNCTION common.jwt_active_tenant_id () TO authenticated;
GRANT EXECUTE ON FUNCTION common.jwt_active_tenant_id () TO service_role;

-- Policies: tenant catalog — members only
CREATE POLICY tenants_select_member ON common.tenants FOR SELECT TO authenticated USING (
  tenant_id IN (SELECT common.user_tenant_ids ())
);

CREATE POLICY tenants_modify_service ON common.tenants FOR ALL TO service_role USING (true)
WITH
  CHECK (true);

-- Memberships: users see only their rows
CREATE POLICY tenant_memberships_select_own ON common.tenant_memberships FOR SELECT TO authenticated USING (
  user_id = (SELECT auth.uid ())
);

CREATE POLICY tenant_memberships_modify_service ON common.tenant_memberships FOR ALL TO service_role USING (true)
WITH
  CHECK (true);

-- Profiles: users manage only their rows within tenants they belong to
CREATE POLICY profiles_select_own ON common.profiles FOR SELECT TO authenticated USING (
  user_id = (SELECT auth.uid ())
  AND tenant_id IN (SELECT common.user_tenant_ids ())
);

CREATE POLICY profiles_insert_own ON common.profiles FOR INSERT TO authenticated WITH CHECK (
  user_id = (SELECT auth.uid ())
  AND tenant_id IN (SELECT common.user_tenant_ids ())
);

CREATE POLICY profiles_update_own ON common.profiles FOR UPDATE TO authenticated USING (
  user_id = (SELECT auth.uid ())
  AND tenant_id IN (SELECT common.user_tenant_ids ())
)
WITH
  CHECK (
    user_id = (SELECT auth.uid ())
    AND tenant_id IN (SELECT common.user_tenant_ids ())
  );

CREATE POLICY profiles_modify_service ON common.profiles FOR ALL TO service_role USING (true)
WITH
  CHECK (true);

-- Domain tables: tenant isolation via membership
CREATE POLICY meeting_sessions_all_member ON meeting.meeting_sessions FOR ALL TO authenticated USING (
  tenant_id IN (SELECT common.user_tenant_ids ())
)
WITH
  CHECK (
    tenant_id IN (SELECT common.user_tenant_ids ())
  );

CREATE POLICY meeting_sessions_service ON meeting.meeting_sessions FOR ALL TO service_role USING (true)
WITH
  CHECK (true);

CREATE POLICY cost_centers_all_member ON accounting.cost_centers FOR ALL TO authenticated USING (
  tenant_id IN (SELECT common.user_tenant_ids ())
)
WITH
  CHECK (
    tenant_id IN (SELECT common.user_tenant_ids ())
  );

CREATE POLICY cost_centers_service ON accounting.cost_centers FOR ALL TO service_role USING (true)
WITH
  CHECK (true);

CREATE POLICY journal_lines_all_member ON accounting.journal_lines FOR ALL TO authenticated USING (
  tenant_id IN (SELECT common.user_tenant_ids ())
)
WITH
  CHECK (
    tenant_id IN (SELECT common.user_tenant_ids ())
  );

CREATE POLICY journal_lines_service ON accounting.journal_lines FOR ALL TO service_role USING (true)
WITH
  CHECK (true);

COMMENT ON FUNCTION common.user_tenant_ids IS 'Returns tenant UUIDs the current auth user belongs to; drives RLS membership checks.';
COMMENT ON FUNCTION common.jwt_active_tenant_id IS 'Reads active_tenant_id from JWT app_metadata for request-scoped isolation when populated server-side.';
