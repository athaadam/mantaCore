-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2025 at 05:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mantacore`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `companyID` bigint(20) UNSIGNED NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `companyCode` varchar(255) NOT NULL,
  `subscription_start` timestamp NULL DEFAULT NULL,
  `subscription_until` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`companyID`, `companyName`, `companyCode`, `subscription_start`, `subscription_until`, `created_at`, `updated_at`) VALUES
(1, 'asdsada', 'ASDASD', '2025-07-23 03:27:37', '2025-08-22 03:27:37', '2025-07-23 03:27:37', '2025-07-23 03:27:37'),
(2, 'hahahaha', 'HAHHAH', '2025-07-27 23:21:30', '2025-08-26 23:21:30', '2025-07-27 23:21:30', '2025-07-27 23:21:30'),
(3, 'mantanest', 'MANMAN', '2025-08-07 11:49:37', '2025-09-06 11:49:37', '2025-08-07 11:49:37', '2025-08-07 11:49:37');

-- --------------------------------------------------------

--
-- Table structure for table `costumers`
--

CREATE TABLE `costumers` (
  `costumerID` bigint(20) UNSIGNED NOT NULL,
  `companyID` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `costumers`
--

INSERT INTO `costumers` (`costumerID`, `companyID`, `username`, `email`, `phone_number`, `created_at`, `updated_at`) VALUES
(1, 1, 'mantanest', 'dfgdfg@gmail.com', '087801084021', '2025-07-25 23:06:27', '2025-07-25 23:06:27'),
(2, 2, 'member1', 'adam@gmail.com', '081234567890', '2025-07-27 23:23:56', '2025-07-27 23:23:56'),
(3, 1, 'non member', 'ajs0ndan@askj0ndkasj0nd', '-', '2025-07-29 07:04:51', '2025-07-29 07:04:51');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoiceID` varchar(255) NOT NULL,
  `userID` bigint(20) UNSIGNED NOT NULL,
  `companyID` bigint(20) UNSIGNED NOT NULL,
  `costumerID` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoiceID`, `userID`, `companyID`, `costumerID`, `date`, `amount`, `created_at`, `updated_at`) VALUES
('INV-ASDASD-001', 1, 1, 1, '2025-07-26', 21000000.00, '2025-07-25 23:07:13', '2025-07-25 23:07:13'),
('INV-ASDASD-002', 1, 1, 1, '2025-07-26', 2700000.00, '2025-07-25 23:07:38', '2025-07-25 23:07:38'),
('INV-ASDASD-003', 1, 1, 1, '2025-07-26', 2900000.00, '2025-07-25 23:16:56', '2025-07-25 23:16:56'),
('INV-ASDASD-004', 1, 1, 3, '2025-07-29', 8000000.00, '2025-07-29 07:05:30', '2025-07-29 07:05:30'),
('INV-ASDASD-005', 4, 1, 1, '2025-07-29', 30000000.00, '2025-07-29 07:37:14', '2025-07-29 07:37:14'),
('INV-HAHHAH-001', 2, 2, 2, '2025-07-28', 100000000.00, '2025-07-27 23:24:33', '2025-07-27 23:24:33');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `invoiceItemID` bigint(20) UNSIGNED NOT NULL,
  `invoiceID` varchar(255) NOT NULL,
  `itemID` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unitPrice` decimal(12,2) NOT NULL,
  `subTotal` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`invoiceItemID`, `invoiceID`, `itemID`, `type`, `quantity`, `unitPrice`, `subTotal`, `created_at`, `updated_at`) VALUES
(1, 'INV-ASDASD-001', 2, 'sales', 100, 210000.00, 21000000.00, '2025-07-25 23:07:13', '2025-07-25 23:07:13'),
(2, 'INV-ASDASD-002', 2, 'sales', 10, 270000.00, 2700000.00, '2025-07-25 23:07:38', '2025-07-25 23:07:38'),
(3, 'INV-ASDASD-003', 2, 'sales', 10, 290000.00, 2900000.00, '2025-07-25 23:16:56', '2025-07-25 23:16:56'),
(4, 'INV-HAHHAH-001', 3, 'sales', 1000, 100000.00, 100000000.00, '2025-07-27 23:24:33', '2025-07-27 23:24:33'),
(5, 'INV-ASDASD-004', 4, 'sales', 1000, 8000.00, 8000000.00, '2025-07-29 07:05:30', '2025-07-29 07:05:30'),
(6, 'INV-ASDASD-005', 2, 'sales', 120, 250000.00, 30000000.00, '2025-07-29 07:37:14', '2025-07-29 07:37:14');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemID` bigint(20) UNSIGNED NOT NULL,
  `companyID` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `itemPrice` decimal(12,2) NOT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `units` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemID`, `companyID`, `name`, `itemPrice`, `category`, `type`, `units`, `stock`, `created_at`, `updated_at`) VALUES
(2, 1, 'Paket Pro - \"Notepad Premium\"', 200000.00, 'software', 'sales', 'pcs', 760, '2025-07-25 23:03:21', '2025-07-29 07:37:14'),
(3, 2, 'pencil', 10000.00, 'alat tulis', 'sales', 'pcs', 9000, '2025-07-27 23:22:43', '2025-07-27 23:24:33'),
(4, 1, 'kaos kaki', 1000.00, 'pakaian', 'sales', 'pcs', 0, '2025-07-29 07:00:13', '2025-07-29 07:05:30'),
(5, 3, 'freelancer', 1000.00, 'modal', 'operational', 'pcs', 288, '2025-08-07 11:50:31', '2025-08-07 11:54:09'),
(6, 3, 'upwork', 1000.00, 'modal', 'operational', 'pcs', 256, '2025-08-07 11:50:59', '2025-08-07 11:52:15'),
(7, 3, 'trading', 1000.00, 'modal', 'operational', 'pcs', 1339, '2025-08-07 11:52:39', '2025-08-15 15:14:08'),
(8, 3, 'software', 1000.00, 'freelance', 'sales', 'pcs', 9999, '2025-08-07 11:55:05', '2025-08-07 11:55:05'),
(9, 3, 'profit crypto', 17000.00, 'freelance', 'sales', 'pcs', 9999, '2025-08-07 11:55:55', '2025-08-07 11:55:55'),
(10, 3, 'Joki Tugas', 1000.00, 'freelance', 'sales', 'pcs', 999, '2025-08-07 12:00:02', '2025-08-07 12:00:02');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_06_27_070916_create_companies_table', 1),
(2, '2025_06_27_070916_create_costumers_table', 1),
(3, '2025_06_27_070916_create_items_table', 1),
(4, '2025_06_27_070916_create_users_table', 1),
(5, '2025_06_27_070917_create_invoices_table', 1),
(6, '2025_06_27_070917_create_purchases_table', 1),
(7, '2025_06_27_070918_create_invoice_items_table', 1),
(8, '2025_06_27_070918_create_purchase_items_table', 1),
(9, '2025_06_28_082445_create_personal_access_tokens_table', 1),
(10, '2025_07_02_173950_add_company_id_to_items_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'beea364dfa95843625a222cd5399d207d9b435f615317cb973c9b9b4516b99ed', '[\"*\"]', NULL, NULL, '2025-07-23 03:27:38', '2025-07-23 03:27:38'),
(2, 'App\\Models\\User', 1, 'auth_token', 'e5cc6a2ad4508775409daa1948dcd8ba770fa8793d6c8e0a1f823bf94d45364b', '[\"*\"]', '2025-07-23 03:32:52', NULL, '2025-07-23 03:27:44', '2025-07-23 03:32:52'),
(3, 'App\\Models\\User', 1, 'auth_token', 'bcadc3fa22a8575c3cfd771c01526a7c0b7d1a902379dde93444573b2ae758c5', '[\"*\"]', '2025-07-25 23:23:03', NULL, '2025-07-25 23:02:06', '2025-07-25 23:23:03'),
(4, 'App\\Models\\User', 1, 'auth_token', '2f4e3bd0f60e44ece8ddb35616a155dc8f43ebb9d1f8612bd10e836fb25cf41d', '[\"*\"]', '2025-07-25 23:20:34', NULL, '2025-07-25 23:20:14', '2025-07-25 23:20:34'),
(5, 'App\\Models\\User', 2, 'auth_token', 'a25fb0f8255b62f843674ea3859fd3dabb0e7de460d48169d9ec0cf69e0369ce', '[\"*\"]', NULL, NULL, '2025-07-27 23:21:32', '2025-07-27 23:21:32'),
(6, 'App\\Models\\User', 2, 'auth_token', '1759989315d210002422abed4c10193bd2027713d253722f6a797d5982807112', '[\"*\"]', '2025-07-27 23:21:57', NULL, '2025-07-27 23:21:43', '2025-07-27 23:21:57'),
(8, 'App\\Models\\User', 1, 'auth_token', '93e47296a6d8e146d61f01792da91b337d808d6d16e84a8dd90ff4be65698099', '[\"*\"]', '2025-07-29 06:58:41', NULL, '2025-07-29 06:58:18', '2025-07-29 06:58:41'),
(12, 'App\\Models\\User', 2, 'auth_token', 'd29c18abe689dead6f52e8f1040c95ff29c067034ae27c6d37b24eeb83611fd4', '[\"*\"]', '2025-07-30 07:37:18', NULL, '2025-07-30 07:37:10', '2025-07-30 07:37:18'),
(13, 'App\\Models\\User', 2, 'auth_token', '06e6ff101af3bee3e7ef236ff5651db6d21c560919de6dfce2c9418aea730611', '[\"*\"]', '2025-07-30 10:11:22', NULL, '2025-07-30 09:34:10', '2025-07-30 10:11:22'),
(14, 'App\\Models\\User', 5, 'auth_token', 'c7a9f876db295e77130b3e9bdcd14940f95159a00da22f082ac9d300ec7efd38', '[\"*\"]', NULL, NULL, '2025-08-07 11:49:38', '2025-08-07 11:49:38'),
(15, 'App\\Models\\User', 5, 'auth_token', '4a6847e30108526b4567aca7185fa2956fda414721042b73689fd584641ffee3', '[\"*\"]', '2025-08-07 12:10:24', NULL, '2025-08-07 11:49:43', '2025-08-07 12:10:24'),
(16, 'App\\Models\\User', 5, 'auth_token', 'ac83c9c70282fd7d554c433479f50d7e9cfbc7a5eff12ce9b664568d69167edb', '[\"*\"]', '2025-08-11 05:40:33', NULL, '2025-08-11 05:40:20', '2025-08-11 05:40:33'),
(17, 'App\\Models\\User', 5, 'auth_token', '0a1e4a74f2c00bd98782620a22cad41360f7b51aeda6d0a89a50814e4dc90931', '[\"*\"]', '2025-08-12 16:11:48', NULL, '2025-08-12 16:01:44', '2025-08-12 16:11:48'),
(18, 'App\\Models\\User', 5, 'auth_token', '8078abb786785aac3ff0dce10d8f7fbe0cf195aa5d3bcf8a3ac44fdda6744cae', '[\"*\"]', '2025-08-15 15:14:12', NULL, '2025-08-15 14:51:59', '2025-08-15 15:14:12');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `purchaseID` varchar(255) NOT NULL,
  `userID` bigint(20) UNSIGNED NOT NULL,
  `companyID` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`purchaseID`, `userID`, `companyID`, `status`, `date`, `amount`, `created_at`, `updated_at`) VALUES
('PR-ASDASD-001', 1, 1, 'accepted', '2025-07-26', 200000000.00, '2025-07-25 23:04:35', '2025-07-25 23:04:57'),
('PR-ASDASD-002', 1, 1, 'accepted', '2025-07-29', 1000000.00, '2025-07-29 07:01:33', '2025-07-29 07:02:28'),
('PR-HAHHAH-001', 2, 2, 'accepted', '2025-07-28', 100000000.00, '2025-07-27 23:23:12', '2025-07-27 23:23:31'),
('PR-MANMAN-001', 5, 3, 'accepted', '2025-08-07', 494000.00, '2025-08-07 11:51:57', '2025-08-07 11:52:15'),
('PR-MANMAN-002', 5, 3, 'accepted', '2025-08-07', 600000.00, '2025-08-07 11:53:02', '2025-08-07 11:53:13'),
('PR-MANMAN-003', 5, 3, 'accepted', '2025-08-07', 50000.00, '2025-08-07 11:53:57', '2025-08-07 11:54:09'),
('PR-MANMAN-004', 5, 3, 'accepted', '2025-08-12', 423000.00, '2025-08-12 16:03:30', '2025-08-12 16:03:42'),
('PR-MANMAN-005', 5, 3, 'accepted', '2025-08-15', 316000.00, '2025-08-15 14:53:10', '2025-08-15 15:14:08');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_items`
--

CREATE TABLE `purchase_items` (
  `purchaseItemID` bigint(20) UNSIGNED NOT NULL,
  `purchaseID` varchar(255) NOT NULL,
  `itemID` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unitPrice` decimal(12,2) NOT NULL,
  `subTotal` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchase_items`
--

INSERT INTO `purchase_items` (`purchaseItemID`, `purchaseID`, `itemID`, `type`, `quantity`, `unitPrice`, `subTotal`, `created_at`, `updated_at`) VALUES
(3, 'PR-ASDASD-001', 2, 'purchase', 1000, 200000.00, 200000000.00, '2025-07-25 23:04:35', '2025-07-25 23:04:35'),
(5, 'PR-HAHHAH-001', 3, 'purchase', 10000, 10000.00, 100000000.00, '2025-07-27 23:23:12', '2025-07-27 23:23:12'),
(6, 'PR-ASDASD-002', 4, 'purchase', 1000, 1000.00, 1000000.00, '2025-07-29 07:01:33', '2025-07-29 07:01:33'),
(7, 'PR-MANMAN-001', 5, 'purchase', 238, 1000.00, 238000.00, '2025-08-07 11:51:57', '2025-08-07 11:51:57'),
(8, 'PR-MANMAN-001', 6, 'purchase', 256, 1000.00, 256000.00, '2025-08-07 11:51:57', '2025-08-07 11:51:57'),
(9, 'PR-MANMAN-002', 7, 'purchase', 600, 1000.00, 600000.00, '2025-08-07 11:53:02', '2025-08-07 11:53:02'),
(10, 'PR-MANMAN-003', 5, 'purchase', 50, 1000.00, 50000.00, '2025-08-07 11:53:57', '2025-08-07 11:53:57'),
(11, 'PR-MANMAN-004', 7, 'purchase', 423, 1000.00, 423000.00, '2025-08-12 16:03:30', '2025-08-12 16:03:30'),
(12, 'PR-MANMAN-005', 7, 'purchase', 316, 1000.00, 316000.00, '2025-08-15 14:53:10', '2025-08-15 14:53:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` bigint(20) UNSIGNED NOT NULL,
  `companyID` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `companyID`, `username`, `email`, `phone_number`, `password`, `role`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 1, 'admin123', 'bontangsuntuk@gmail.com', '087801084021', '$2y$12$bo6vcZh/7LzUdzwUHMDOcuN..lvvKI1sy6nBbB232F1mARIFqXnTG', 'admin', 'active', NULL, '2025-07-23 03:27:38', '2025-07-23 03:27:38'),
(2, 2, 'adminnew', 'dfgdfg@gmail.com', '087808289292', '$2y$12$g/PQMx9UuWaSQVpqlkJGFOu3waSCa8BV8RoFrhIqMgCL0Kb8byYMS', 'admin', 'active', NULL, '2025-07-27 23:21:31', '2025-07-27 23:21:31'),
(3, 2, 'managementnew', '12213@gmail.com', 'asdsadsad', '$2y$12$u.FX0m/eeS3S1VtEFbeWuOd7bW6Aa1rGvdp4u2cY0l7y6hGTVdgpy', 'management', 'active', NULL, '2025-07-27 23:26:18', '2025-07-27 23:26:30'),
(4, 1, 'kasirbaru', 'kontolkuda@gmail.com', '9879879879', '$2y$12$vEpssfVf6HoKObyrO9y7kOuW0xvM4O/x5o7kY8nrU.AUryV.Z5nR2', 'cashier', 'active', NULL, '2025-07-29 07:35:45', '2025-07-29 07:35:45'),
(5, 3, 'adam', 'bontansuntuk@gmail.com', '087801084021', '$2y$12$nK7c75aT34fBSBu7IpsiYe1308bkoz3rcabLfaKjfbcqyJs8joEia', 'admin', 'active', NULL, '2025-08-07 11:49:37', '2025-08-07 11:49:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`companyID`),
  ADD UNIQUE KEY `companies_companycode_unique` (`companyCode`);

--
-- Indexes for table `costumers`
--
ALTER TABLE `costumers`
  ADD PRIMARY KEY (`costumerID`),
  ADD UNIQUE KEY `costumers_username_unique` (`username`),
  ADD KEY `costumers_companyid_foreign` (`companyID`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoiceID`),
  ADD KEY `invoices_userid_foreign` (`userID`),
  ADD KEY `invoices_companyid_foreign` (`companyID`),
  ADD KEY `invoices_costumerid_foreign` (`costumerID`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`invoiceItemID`),
  ADD KEY `invoice_items_invoiceid_foreign` (`invoiceID`),
  ADD KEY `invoice_items_itemid_foreign` (`itemID`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemID`),
  ADD KEY `items_companyid_foreign` (`companyID`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchaseID`),
  ADD KEY `purchases_userid_foreign` (`userID`),
  ADD KEY `purchases_companyid_foreign` (`companyID`);

--
-- Indexes for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD PRIMARY KEY (`purchaseItemID`),
  ADD KEY `purchase_items_purchaseid_foreign` (`purchaseID`),
  ADD KEY `purchase_items_itemid_foreign` (`itemID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_companyid_foreign` (`companyID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `companyID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `costumers`
--
ALTER TABLE `costumers`
  MODIFY `costumerID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `invoiceItemID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `purchase_items`
--
ALTER TABLE `purchase_items`
  MODIFY `purchaseItemID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `costumers`
--
ALTER TABLE `costumers`
  ADD CONSTRAINT `costumers_companyid_foreign` FOREIGN KEY (`companyID`) REFERENCES `companies` (`companyID`) ON DELETE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_companyid_foreign` FOREIGN KEY (`companyID`) REFERENCES `companies` (`companyID`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_costumerid_foreign` FOREIGN KEY (`costumerID`) REFERENCES `costumers` (`costumerID`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE;

--
-- Constraints for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `invoice_items_invoiceid_foreign` FOREIGN KEY (`invoiceID`) REFERENCES `invoices` (`invoiceID`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoice_items_itemid_foreign` FOREIGN KEY (`itemID`) REFERENCES `items` (`itemID`) ON DELETE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_companyid_foreign` FOREIGN KEY (`companyID`) REFERENCES `companies` (`companyID`) ON DELETE CASCADE;

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_companyid_foreign` FOREIGN KEY (`companyID`) REFERENCES `companies` (`companyID`) ON DELETE CASCADE,
  ADD CONSTRAINT `purchases_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE;

--
-- Constraints for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD CONSTRAINT `purchase_items_itemid_foreign` FOREIGN KEY (`itemID`) REFERENCES `items` (`itemID`) ON DELETE CASCADE,
  ADD CONSTRAINT `purchase_items_purchaseid_foreign` FOREIGN KEY (`purchaseID`) REFERENCES `purchases` (`purchaseID`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_companyid_foreign` FOREIGN KEY (`companyID`) REFERENCES `companies` (`companyID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
