-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2019 at 12:47 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fundDetails`
--

-- --------------------------------------------------------

--
-- Table structure for table `funinfo`
--

CREATE TABLE `funinfo` (
  `id` int(11) NOT NULL,
  `minAmount` int(11) NOT NULL,
  `donors` int(11) NOT NULL,
  `endDate` date NOT NULL,
  `targetAmount` int(11) NOT NULL,
  `amountReceived` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `funinfo`
--

INSERT INTO `funinfo` (`id`, `minAmount`, `donors`, `endDate`, `targetAmount`, `amountReceived`) VALUES
(1, 50, 0, '2019-04-20', 10000, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `funinfo`
--
ALTER TABLE `funinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `funinfo`
--
ALTER TABLE `funinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
