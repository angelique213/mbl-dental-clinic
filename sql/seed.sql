-- ==========================================
-- MBL Dental Clinic Sample Data
-- ==========================================

-- Sample Services
INSERT INTO services (service_name, description, price)
VALUES
('Dental Cleaning', 'Professional teeth cleaning', 1000.00),
('Teeth Whitening', 'Professional whitening treatment', 5000.00),
('Braces Consultation', 'Orthodontic consultation', 800.00),
('Tooth Extraction', 'Simple tooth extraction', 1500.00),
('Dental Filling', 'Composite dental filling', 1200.00);

-- Sample Admin Account
INSERT INTO users
(first_name, last_name, email, password, role)
VALUES
(
'Admin',
'User',
'admin@mbl.com',
'$2b$10$examplehashedpassword',
'admin'
);

-- Sample Patient Account
INSERT INTO users
(first_name, last_name, email, password, role)
VALUES
(
'Sample',
'Patient',
'sample@mbl.com',
'$2b$10$examplehashedpassword',
'patient'
);

-- Sample Patient Profile
INSERT INTO patients
(user_id, phone, address)
VALUES
(
2,
'09123456789',
'Maragondon, Cavite'
);