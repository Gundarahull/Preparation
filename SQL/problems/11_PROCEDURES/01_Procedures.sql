-- PROCEDURE

CREATE OR REPLACE procedure sp_usa()
LANGUAGE plpgsql
AS $$
BEGIN
	PERFORM 'RAHUL';
	RAISE NOTICE 'HELLO PUHUL';
END;
$$

CALL sp_usa();




CREATE OR REPLACE PROCEDURE sp_country(
	p_country varchar(100)
)
LANGUAGE plpgsql
AS $$
DECLARE t_users INT;
BEGIN

	select count(*) into t_users from users where city = p_country;

	RAISE NOTICE 'TOTAL USERS : %', t_users;
	


END;
$$

call sp_country('Bengaluru')


CREATE OR REPLACE PROCEDURE sp_city_summary(
    p_city VARCHAR(100) DEFAULT 'Bengaluru'
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_total_users INT;
    v_active_users INT;
BEGIN

    SELECT COUNT(*)
    INTO v_total_users
    FROM users
    WHERE city = p_city;

    SELECT COUNT(*)
    INTO v_active_users
    FROM users
    WHERE city = p_city
    AND status='active';

    RAISE NOTICE 'City: %', p_city;
    RAISE NOTICE 'Total Users: %', v_total_users;
    RAISE NOTICE 'Active Users: %', v_active_users;

END;
$$;

call sp_city_summary();



--========================================================


CREATE OR REPLACE PROCEDURE sp_if_else(
    p_city VARCHAR(100) DEFAULT 'Bengaluru',
    p_status VARCHAR(50) DEFAULT NULL,
    p_name VARCHAR(50) DEFAULT 'USER-RAHUL'
)
LANGUAGE plpgsql
AS
$$
DECLARE 
    v_usi INT; -- Cleaned up unused v_hiu
BEGIN

    -- IF BLOCK
    IF EXISTS(SELECT 1 FROM users WHERE status = p_status) THEN
        SELECT COUNT(*) INTO v_usi 
        FROM users 
        WHERE status = p_status AND city = p_city;
    ELSE
        RAISE NOTICE 'HGKGJKGJKJK';
    END IF;

    RAISE NOTICE 'CITY : %', p_city;
    RAISE NOTICE 'NAME : %', p_name;
    
    -- Fixed by adding the ::TEXT cast
    RAISE NOTICE 'ACTIVE USERS % :', COALESCE(v_usi::TEXT, 'N?A');

EXCEPTION
    WHEN division_by_zero THEN
        RAISE NOTICE 'Cannot divide by zero';
	
    WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
END;
$$;
-- Drop the version that has 2 parameters
DROP PROCEDURE IF EXISTS sp_if_else(varchar, varchar);

-- Drop the version that has 3 parameters
DROP PROCEDURE IF EXISTS sp_if_else(varchar, varchar, varchar);

CALL sp_if_else(p_status => 'active');
