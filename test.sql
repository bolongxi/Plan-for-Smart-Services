START TRANSACTION;

INSERT INTO Car
	(model, rate)
VALUES
	('2003 Lexus RX330', 4.00),
	('2001 Toyota Corolla', 1.33);

INSERT INTO Store
	(storeName, lat, lng)
VALUES
	('Flower Power', 12, 12),
	('Circle-K', 20, 20);

INSERT INTO Product
	(description, storeId, price)
VALUES
	('Rose', 1, 4.00),
	('Orchid', 1, 2.33),
	('Excel Gum', 2, 1.00);

-- INSERT INTO Review
	-- (feedback, userId)
-- VALUES
	-- ('This is feedback provided by user 1', 1),
	-- ('This is some more feedback kindly provided by user 2', 3);

INSERT INTO LuxuryCar
	(model, rate)
VALUES
	('Mercedes-Benz EQC 2021', 2000),
	('Jaguar I-Pace 2021', 3000),
	('Ford Mustang Mach-E 2021', 4000),
	('Tesla Model S 2021', 5000);

INSERT INTO Racer
	(racerName, country)
VALUES
	('Lewis Hamilton', 'United Kingdom'),
	('Sebastian Vettel', 'Germany'),
	('Fernando Alonse', 'Spain'),
	('Felipe Massa', 'Brazil');

COMMIT;
