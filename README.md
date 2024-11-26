INSERT INTO `drivers` (`name`, `password`, `email`, `phone_number`, `driver_license_id`, `vehicle_registration`) VALUES ('Lê Văn H', 'H_1234', 'H@example.com', '0xx.xxx.xxxx', 'xxxxxxxxxxxx', 'xxxxxx');

ALTER TABLE drivers MODIFY id INT NOT NULL AUTO_INCREMENT;

SHOW CREATE TABLE fall2024c56g8_crab.orders;
ALTER TABLE fall2024c56g8_crab.orders DROP FOREIGN KEY orders_ibfk_2;

SHOW CREATE TABLE fall2024c56g8_crab.password_resets;
ALTER TABLE fall2024c56g8_crab.password_resets DROP FOREIGN KEY password_resets_ibfk_2;

SHOW CREATE TABLE fall2024c56g8_crab.penalties;
ALTER TABLE fall2024c56g8_crab.penalties DROP FOREIGN KEY penalties_ibfk_2;

SHOW CREATE TABLE fall2024c56g8_crab.reports;
ALTER TABLE fall2024c56g8_crab.reports DROP FOREIGN KEY reports_ibfk_2;



ALTER TABLE fall2024c56g8_crab.orders 
ADD CONSTRAINT orders_ibfk_2 FOREIGN KEY (driver_id) REFERENCES fall2024c56g8_crab.drivers(id);

ALTER TABLE fall2024c56g8_crab.password_resets 
ADD CONSTRAINT password_resets_ibfk_2 FOREIGN KEY (user_id) REFERENCES fall2024c56g8_crab.drivers(id);

ALTER TABLE fall2024c56g8_crab.penalties
ADD CONSTRAINT penalties_ibfk_2 FOREIGN KEY (user_id) REFERENCES fall2024c56g8_crab.drivers(id);

ALTER TABLE fall2024c56g8_crab.reports
ADD CONSTRAINT reports_ibfk_2 FOREIGN KEY (driver_id) REFERENCES fall2024c56g8_crab.drivers(id);

INSERT INTO `reports` (`driver_id`, `customer_id`, `status`, `comment`) VALUES ('1', '1', 'Bad attitude', '');

INSERT INTO `reports` (`driver_id`, `customer_id`, `status`, `comment`) VALUES ('1', '2', 'Vehicle problem', '');

INSERT INTO `reports` (`driver_id`, `customer_id`, `status`, `comment`) VALUES ('1', '4', 'Other', 'The driver is ex-lover');

INSERT INTO `reports` (`driver_id`, `customer_id`, `status`, `comment`) VALUES ('1', '3', 'Reckless driving', 'The driver is ex-lover');

const [customers, setCustomers] = useState([
    {name: "Nguyễn Văn A", gmail: "A@example.com", user_id: "1", phone: "0xx.xxx.xxxx", report: ""},
    {name: "Lê Văn C", gmail: "C@example.com", user_id: "2", phone: "0xx.xxx.xxxx", report: ""},
    {name: "Vũ Văn E", gmail: "E@example.com", user_id: "3", phone: "0xx.xxx.xxxx", report: ""},
    {name: "Trần Văn F", gmail: "F@example.com", user_id: "4", phone: "0xx.xxx.xxxx", report: ""},
]);

const [drivers, setDrivers] = useState([
    {name: "Nguyễn Văn B", gmail: "B@example.com", user_id: "1", phone: "0xx.xxx.xxxx", report: "+2"},
    {name: "Đoàn Văn D", gmail: "D@example.com", user_id: "2", phone: "0xx.xxx.xxxx", report: ""},
    {name: "Hà Văn O", gmail: "O@example.com", user_id: "3", phone: "0xx.xxx.xxxx", report: "+3"},
    {name: "Trần Văn G", gmail: "G@example.com", user_id: "4", phone: "0xx.xxx.xxxx", report: ""},
    {name: "Lê Văn H", gmail: "H@example.com", user_id: "5", phone: "0xx.xxx.xxxx", report: "+1"},
]);

const FailedTransaction = [
    {trans_id: "t_5", cus_id: "1", driver_id: "2", information: "37.000 VNĐ", state: "lỗi"},
    {trans_id: "t_7", cus_id: "9", driver_id: "5", information: "", state: "lỗi"},
    {trans_id: "t_9", cus_id: "3", driver_id: "4", information: "", state: "lỗi"},
    {trans_id: "t_11", cus_id: "10", driver_id: "7", information: "", state: "lỗi"},
]

const SuccessfulTransaction = [
    {trans_id: "t_1", cus_id: "2", driver_id: "1", information: "", state: "hoàn thành"},
    {trans_id: "t_2", cus_id: "4", driver_id: "7", information: "", state: "hoàn thành"},
    {trans_id: "t_3", cus_id: "3", driver_id: "3", information: "", state: "hoàn thành"},
    {trans_id: "t_6", cus_id: "5", driver_id: "4", information: "", state: "hoàn thành"},
    {trans_id: "t_8", cus_id: "12", driver_id: "6", information: "", state: "hoàn thành"},
]