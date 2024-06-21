-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 21, 2024 at 01:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skills_auditor`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `system_role` int(11) NOT NULL,
  `job_role` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `managed_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `username`, `password`, `system_role`, `job_role`, `first_name`, `surname`, `managed_by`) VALUES
(1, 'jdoe@email.com', 'Test1', 1, 1, 'John', 'Doe', 3),
(2, 'jsmith@email.com', 'Test2', 1, 1, 'Jane', 'Smith', 4),
(3, 'edavis@email.com', 'Test3', 2, 2, 'Emily', 'Davis', 3),
(4, 'owilson@email.com', 'Test4', 2, 2, 'Olivia', 'Wilson', 4),
(5, 'rbrown@email.com', 'Test5', 3, 3, 'Robert', 'Brown', 3),
(6, 'mjohnson@email.com', 'Test6', 3, 3, 'Michael', 'Johnson', 4);

-- --------------------------------------------------------

--
-- Table structure for table `employee_skill_details`
--

CREATE TABLE `employee_skill_details` (
  `id` int(11) NOT NULL,
  `employee` int(11) NOT NULL,
  `skill` varchar(50) NOT NULL,
  `expiration` date DEFAULT NULL,
  `level` int(11) NOT NULL,
  `notes` varchar(535) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_skill_details`
--

INSERT INTO `employee_skill_details` (`id`, `employee`, `skill`, `expiration`, `level`, `notes`) VALUES
(1, 1, 'Git', '2025-06-01', 2, 'Good experience with Git'),
(2, 2, 'Junit', NULL, 3, 'Strong experience with Junit'),
(3, 3, 'Word', NULL, 1, NULL),
(4, 4, 'Java', '2024-06-20', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_role`
--

CREATE TABLE `job_role` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_role`
--

INSERT INTO `job_role` (`id`, `role`) VALUES
(1, 'Junior Developer'),
(2, 'Mid-Level Developer'),
(3, 'Senior Developer');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `name` varchar(50) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`name`, `category`) VALUES
('Word', 1),
('Java', 2),
('Junit', 3),
('Git', 4);

-- --------------------------------------------------------

--
-- Table structure for table `skill_categories`
--

CREATE TABLE `skill_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill_categories`
--

INSERT INTO `skill_categories` (`id`, `name`) VALUES
(1, 'Office 365'),
(2, 'Programming'),
(3, 'Testing Tools'),
(4, 'Version Control');

-- --------------------------------------------------------

--
-- Table structure for table `skill_level`
--

CREATE TABLE `skill_level` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill_level`
--

INSERT INTO `skill_level` (`id`, `level`) VALUES
(1, 'Basic'),
(2, 'Advanced'),
(3, 'Expert');

-- --------------------------------------------------------

--
-- Table structure for table `system_role`
--

CREATE TABLE `system_role` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_role`
--

INSERT INTO `system_role` (`id`, `role`) VALUES
(1, 'StaffUser'),
(2, 'Manager'),
(3, 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `system_role` (`system_role`),
  ADD KEY `job_role` (`job_role`),
  ADD KEY `managed_by` (`managed_by`);

--
-- Indexes for table `employee_skill_details`
--
ALTER TABLE `employee_skill_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee` (`employee`),
  ADD KEY `skill` (`skill`),
  ADD KEY `level` (`level`);

--
-- Indexes for table `job_role`
--
ALTER TABLE `job_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`name`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `skill_categories`
--
ALTER TABLE `skill_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill_level`
--
ALTER TABLE `skill_level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_role`
--
ALTER TABLE `system_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee_skill_details`
--
ALTER TABLE `employee_skill_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `job_role`
--
ALTER TABLE `job_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `skill_categories`
--
ALTER TABLE `skill_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `skill_level`
--
ALTER TABLE `skill_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `system_role`
--
ALTER TABLE `system_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`system_role`) REFERENCES `system_role` (`id`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`job_role`) REFERENCES `job_role` (`id`),
  ADD CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`managed_by`) REFERENCES `employee` (`id`);

--
-- Constraints for table `employee_skill_details`
--
ALTER TABLE `employee_skill_details`
  ADD CONSTRAINT `employee_skill_details_ibfk_1` FOREIGN KEY (`employee`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `employee_skill_details_ibfk_2` FOREIGN KEY (`skill`) REFERENCES `skill` (`name`),
  ADD CONSTRAINT `employee_skill_details_ibfk_3` FOREIGN KEY (`level`) REFERENCES `skill_level` (`id`);

--
-- Constraints for table `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`category`) REFERENCES `skill_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
