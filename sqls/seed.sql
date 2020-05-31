SET client_min_messages = error;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

DROP TABLE IF EXISTS public.results CASCADE;

CREATE TABLE public.results (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    result         JSONB,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.results IS E'@omit create';

SET client_min_messages = INFO;

-- Admin role

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'admin') THEN

      CREATE ROLE admin LOGIN PASSWORD 'password';
   END IF;
END
$do$;

GRANT USAGE ON SCHEMA public TO admin;
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;

-- Anonymous role

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'anonymous') THEN

      CREATE ROLE anonymous NOLOGIN;
   END IF;
END
$do$;

GRANT USAGE ON SCHEMA public TO anonymous;

-- public.insert_result function

DROP FUNCTION IF EXISTS public.create_result;
CREATE FUNCTION public.create_result(result JSONB)
RETURNS boolean
AS $$
    INSERT INTO
        public.results
    (
        result
    )
    VALUES (
        result
    )
    RETURNING true;
$$ LANGUAGE sql VOLATILE STRICT SECURITY DEFINER;