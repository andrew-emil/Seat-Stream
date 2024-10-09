-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 07:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinema`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `movie_id` varchar(255) NOT NULL,
  `booking_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `no_of_seats` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_categories`
--

CREATE TABLE `food_categories` (
  `category_id` int(255) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_categories`
--

INSERT INTO `food_categories` (`category_id`, `category_name`) VALUES
(1, 'cold drinks'),
(2, 'popcorn'),
(3, 'hot food'),
(4, 'hot drink'),
(5, 'sweets'),
(6, 'juice'),
(7, 'extras');

-- --------------------------------------------------------

--
-- Table structure for table `food_drinks`
--

CREATE TABLE `food_drinks` (
  `id` varchar(255) NOT NULL,
  `category_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `photo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_drinks`
--

INSERT INTO `food_drinks` (`id`, `category_id`, `name`, `price`, `photo`) VALUES
('04bdcd82-e56b-449b-9e82-99a2dda62d76', 1, 'Pepsi', 35.00, 'food images/cold drink/pepsi.jpg'),
('17bab001-fe8b-4b1b-a700-ed817506af92', 5, 'Mars', 45.00, 'food images/sweets/mars.jpg'),
('20368d34-a97f-49e2-823c-377de5f00b8c', 6, 'Guava Juice', 80.00, 'food images/juice/guava juice.jpg'),
('27c20b98-4407-4f17-9d39-788fd0e3738a', 1, 'Fruit Slush', 45.00, 'food images/cold drink/fruit slush.jpg'),
('28b2568a-756b-40f9-9d7a-8d9a513dcee8', 5, 'Cotton Candy', 45.00, 'food images/sweets/Cotton Candy.jpg'),
('336f20a8-dd8c-4d62-899e-c31c63254d56', 7, '3D Glasses', 25.00, 'food images/extra/3D glasses.jpg'),
('5517c462-04e2-46d9-a60a-aa8b680c5881', 5, 'Galaxy', 55.00, 'food images/sweets/galaxy.jpg'),
('5b5d7a22-0b49-4992-8d52-5d206960e92f', 3, 'Beef Burger', 120.00, 'food images/hot food/beef burger.jpg'),
('71af7b2c-db3f-45aa-b6a4-060cc6773524', 1, 'Aquafina', 15.00, 'food images/cold drink/aquafina.jpg'),
('97a864db-a153-4189-bd03-19a00eb82d00', 6, 'Mango Juice', 90.00, 'food images/juice/Mango Juice.jpg'),
('a3f3ca5f-389f-48fb-a1d3-ecc4d0324107', 3, 'Beef Hotdog', 100.00, 'food images/hot food/beef hotdog.jpg'),
('a80d7c23-2d26-4936-b955-659923954567', 1, 'Milkshake Chocolate', 95.00, 'food images/cold drink/Milkshake Chocolate.jpg'),
('a8eaf443-5826-43c2-a002-b0db3c0e8a25', 2, 'Large crunchy cheetos popcorn', 125.00, 'food images/popcorn/large crunchy cheetos popcorn.jpg'),
('af715901-9351-49b4-8445-7b063a1764a7', 5, 'Twix', 45.00, 'food images/sweets/twix.jpg'),
('b252aa50-fa4e-489c-8431-a01bb88e9552', 5, 'Bounty', 35.00, 'food images/sweets/bounty.jpg'),
('b7328a55-cd45-4e46-9117-a997a645fc8e', 4, 'Cappuccino', 75.00, 'food images/hot drink/Cappuccino.jpg'),
('becd706d-0c98-4d8b-aa81-13c9be98f9c5', 4, 'Latte', 75.00, 'food images/hot drink/Latte.jpg'),
('d06c1dca-c282-4266-a6ee-17d078468b9e', 2, 'Regular crunchy cheetos popcorn', 110.00, 'food images/popcorn/regular crunchy cheetos popcorn.jpg'),
('d1e83e4a-ff4d-446b-9b18-1f8ae9a1b7ea', 4, 'Hot chocolate', 75.00, 'food images/hot drink/Hot chocolate.jpg'),
('e6e1c36e-66fa-4fb4-a0d1-8db7c30c51e7', 4, 'Hot tea', 35.00, 'food images/hot drink/hot tea.jpg'),
('eb367e2c-5ead-4c00-88a7-cd147993d460', 3, 'Cheesy Cheetos Beef Hotdog', 115.00, 'food images/hot food/cheesy cheetos beef hotdog.jpeg'),
('f1237ad8-6880-4cc6-b662-7a53fe196143', 3, 'Chicken Burger', 120.00, 'food images/hot food/chicken burger.jpeg'),
('f5abaeca-b7cb-4ac8-9de5-dd9b83f52426', 5, 'M&M', 45.00, 'food images/sweets/M&M.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre_id`, `genre_name`) VALUES
(12, 'Adventure'),
(14, 'Fantasy'),
(16, 'Animation'),
(18, 'Drama'),
(27, 'Horror'),
(28, 'Action'),
(35, 'Comedy'),
(36, 'History'),
(37, 'Western'),
(53, 'Thriller'),
(80, 'Crime'),
(99, 'Documentary'),
(878, 'Science Fiction'),
(9648, 'Mystery'),
(10402, 'Music'),
(10749, 'Romance'),
(10751, 'Family'),
(10752, 'War'),
(10770, 'TV Movie');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `trailer` text DEFAULT NULL,
  `running_time` int(11) DEFAULT NULL,
  `story` text NOT NULL,
  `language` varchar(255) NOT NULL,
  `poster` text NOT NULL,
  `release_date` date DEFAULT NULL,
  `now_showing` tinyint(1) NOT NULL,
  `starring` text NOT NULL,
  `director` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `trailer`, `running_time`, `story`, `language`, `poster`, `release_date`, `now_showing`, `starring`, `director`) VALUES
('', 'Venom: The Last Dance', 'https://www.youtube.com/watch?v=__2bjWbetsA', NULL, 'Eddie Brock and Venom must make a devastating decision as they\'re pursued by a mysterious military man.', 'english', 'data:image/jpeg;base64,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', '2024-10-25', 0, 'Tom Hardy,Juno Temple,Alanna Ubach', 'Kelly Marcel'),
('1', 'A Quiet Place: Day One', 'https://www.youtube.com/watch?v=gjx-iHGXk9Q', 100, 'When New York City comes under attack from an alien invasion, a woman and other survivors try to find a way to safety. They soon learn that they must remain absolutely silent as the mysterious creatures are drawn to the slightest sound.', 'English', 'https://i.ytimg.com/vi/gjx-iHGXk9Q/maxresdefault.jpg', '2024-06-27', 1, 'Lupita Nyong\'o, Joseph Quinn, Alex Wolff', ' Michael Sarnoski'),
('2', 'The Garfield Movie', 'https://www.youtube.com/watch?v=IeFWNtMo1Fs', 101, 'After an unexpected reunion with his long-lost father, the street cat Vic, Garfield is forced to leave his very comfortable life with Harald behind. Together with Vic and Odie, he plans a crazy robbery', 'English', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKnNw6EVlJ_ca_KrnQdZCjPOGdintsXz8XHuP5kSG6Kzl6_dXw', '2024-05-22', 1, 'Chris Pratt, Nicholas Hoult, Snoop Dogg', 'Mark Dindal'),
('3', 'Welad Rizk 3', 'https://www.youtube.com/watch?v=NARJeLxUBhs', 125, 'The lions are back and living their dream of running a clean and legitimate car showroom. This dream quickly evaporates when old enemies “Sakr” and “Sherbeeni” blow up the place, putting the sons of Rizk in a deep financial burden. A seemingly impossible mission presents itself, promising the lions salvation from their troubles. Little do they know that they are now no longer dealing with old foes, but rather the most notorious criminal of the underground world… “Sultan El Ghoul”.', 'Arabic', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfMzffFbNb9HnKq41w9b78UaRE1hkcZu8j2fyNcreTVSEk5qM', '2024-06-13', 1, ' Ahmed Ezz, Asser Yassine, Sayed Ragab, Asmaa Galal', 'Tarek Alarian'),
('4', 'BAD BOYS: RIDE OR DIE', 'https://www.youtube.com/watch?v=hRFY_Fesa9Q', 115, 'This Summer, the world\'s favorite Bad Boys are back with their iconic mix of edge-of-your seat action and outrageous comedy but this time with a twist: Miami\'s finest are now on the run.', 'English', 'https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg', '2024-06-05', 1, 'Vanessa Hudgens, Martin Lawrence, Will Smith, Alexander Ludwig', 'Adil El Arbi, Bilall Fallah');

-- --------------------------------------------------------

--
-- Table structure for table `movies_genres`
--

CREATE TABLE `movies_genres` (
  `movie_id` varchar(255) NOT NULL,
  `genre_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `seat_id` bigint(20) UNSIGNED NOT NULL,
  `theater_id` int(11) DEFAULT NULL,
  `row` varchar(5) NOT NULL,
  `seat_no` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`seat_id`, `theater_id`, `row`, `seat_no`, `status`) VALUES
(1, 1, 'A', 1, 1),
(2, 1, 'A', 2, 1),
(3, 1, 'A', 3, 1),
(4, 1, 'A', 4, 1),
(5, 1, 'A', 5, 1),
(6, 1, 'A', 6, 1),
(7, 1, 'A', 7, 1),
(8, 1, 'A', 8, 1),
(9, 1, 'A', 9, 1),
(10, 1, 'A', 10, 1),
(11, 1, 'A', 11, 1),
(12, 1, 'A', 12, 1),
(13, 1, 'A', 13, 1),
(14, 1, 'A', 14, 1),
(15, 1, 'A', 15, 1),
(16, 1, 'A', 16, 1),
(17, 1, 'A', 17, 1),
(18, 1, 'A', 18, 1),
(19, 1, 'A', 19, 1),
(20, 1, 'A', 20, 1),
(21, 1, 'B', 1, 1),
(22, 1, 'B', 2, 1),
(23, 1, 'B', 3, 1),
(24, 1, 'B', 4, 1),
(25, 1, 'B', 5, 1),
(26, 1, 'B', 6, 1),
(27, 1, 'B', 7, 1),
(28, 1, 'B', 8, 1),
(29, 1, 'B', 9, 1),
(30, 1, 'B', 10, 1),
(31, 1, 'B', 11, 1),
(32, 1, 'B', 12, 1),
(33, 1, 'B', 13, 1),
(34, 1, 'B', 14, 1),
(35, 1, 'B', 15, 1),
(36, 1, 'B', 16, 1),
(37, 1, 'B', 17, 1),
(38, 1, 'B', 18, 1),
(39, 1, 'B', 19, 1),
(40, 1, 'B', 20, 1),
(41, 1, 'C', 1, 1),
(42, 1, 'C', 2, 1),
(43, 1, 'C', 3, 1),
(44, 1, 'C', 4, 1),
(45, 1, 'C', 5, 1),
(46, 1, 'C', 6, 1),
(47, 1, 'C', 7, 1),
(48, 1, 'C', 8, 1),
(49, 1, 'C', 9, 1),
(50, 1, 'C', 10, 1),
(51, 1, 'C', 11, 1),
(52, 1, 'C', 12, 1),
(53, 1, 'C', 13, 1),
(54, 1, 'C', 14, 1),
(55, 1, 'C', 15, 1),
(56, 1, 'C', 16, 1),
(57, 1, 'C', 17, 1),
(58, 1, 'C', 18, 1),
(59, 1, 'C', 19, 1),
(60, 1, 'C', 20, 1),
(61, 1, 'D', 1, 1),
(62, 1, 'D', 2, 1),
(63, 1, 'D', 3, 1),
(64, 1, 'D', 4, 1),
(65, 1, 'D', 5, 1),
(66, 1, 'D', 6, 1),
(67, 1, 'D', 7, 1),
(68, 1, 'D', 8, 1),
(69, 1, 'D', 9, 1),
(70, 1, 'D', 10, 1),
(71, 1, 'D', 11, 1),
(72, 1, 'D', 12, 1),
(73, 1, 'D', 13, 1),
(74, 1, 'D', 14, 1),
(75, 1, 'D', 15, 1),
(76, 1, 'D', 16, 1),
(77, 1, 'D', 17, 1),
(78, 1, 'D', 18, 1),
(79, 1, 'D', 19, 1),
(80, 1, 'D', 20, 1),
(81, 1, 'E', 1, 1),
(82, 1, 'E', 2, 1),
(83, 1, 'E', 3, 1),
(84, 1, 'E', 4, 1),
(85, 1, 'E', 5, 1),
(86, 1, 'E', 6, 1),
(87, 1, 'E', 7, 1),
(88, 1, 'E', 8, 1),
(89, 1, 'E', 9, 1),
(90, 1, 'E', 10, 1),
(91, 1, 'E', 11, 1),
(92, 1, 'E', 12, 1),
(93, 1, 'E', 13, 1),
(94, 1, 'E', 14, 1),
(95, 1, 'E', 15, 1),
(96, 1, 'E', 16, 1),
(97, 1, 'E', 17, 1),
(98, 1, 'E', 18, 1),
(99, 1, 'E', 19, 1),
(100, 1, 'E', 20, 1),
(101, 1, 'F', 1, 1),
(102, 1, 'F', 2, 1),
(103, 1, 'F', 3, 1),
(104, 1, 'F', 4, 1),
(105, 1, 'F', 5, 1),
(106, 1, 'F', 6, 1),
(107, 1, 'F', 7, 1),
(108, 1, 'F', 8, 1),
(109, 1, 'F', 9, 1),
(110, 1, 'F', 10, 1),
(111, 1, 'F', 11, 1),
(112, 1, 'F', 12, 1),
(113, 1, 'F', 13, 1),
(114, 1, 'F', 14, 1),
(115, 1, 'F', 15, 1),
(116, 1, 'F', 16, 1),
(117, 1, 'F', 17, 1),
(118, 1, 'F', 18, 1),
(119, 1, 'F', 19, 1),
(120, 1, 'F', 20, 1),
(121, 1, 'G', 1, 1),
(122, 1, 'G', 2, 1),
(123, 1, 'G', 3, 1),
(124, 1, 'G', 4, 1),
(125, 1, 'G', 5, 1),
(126, 1, 'G', 6, 1),
(127, 1, 'G', 7, 1),
(128, 1, 'G', 8, 1),
(129, 1, 'G', 9, 1),
(130, 1, 'G', 10, 1),
(131, 1, 'G', 11, 1),
(132, 1, 'G', 12, 1),
(133, 1, 'G', 13, 1),
(134, 1, 'G', 14, 1),
(135, 1, 'G', 15, 1),
(136, 1, 'G', 16, 1),
(137, 1, 'G', 17, 1),
(138, 1, 'G', 18, 1),
(139, 1, 'G', 19, 1),
(140, 1, 'G', 20, 1),
(141, 1, 'H', 1, 1),
(142, 1, 'H', 2, 1),
(143, 1, 'H', 3, 1),
(144, 1, 'H', 4, 1),
(145, 1, 'H', 5, 1),
(146, 1, 'H', 6, 1),
(147, 1, 'H', 7, 1),
(148, 1, 'H', 8, 1),
(149, 1, 'H', 9, 1),
(150, 1, 'H', 10, 1),
(151, 1, 'H', 11, 1),
(152, 1, 'H', 12, 1),
(153, 1, 'H', 13, 1),
(154, 1, 'H', 14, 1),
(155, 1, 'H', 15, 1),
(156, 1, 'H', 16, 1),
(157, 1, 'H', 17, 1),
(158, 1, 'H', 18, 1),
(159, 1, 'H', 19, 1),
(160, 1, 'H', 20, 1),
(161, 1, 'J', 1, 1),
(162, 1, 'J', 2, 1),
(163, 1, 'J', 3, 1),
(164, 1, 'J', 4, 1),
(165, 1, 'J', 5, 1),
(166, 1, 'J', 6, 1),
(167, 1, 'J', 7, 1),
(168, 1, 'J', 8, 1),
(169, 1, 'J', 9, 1),
(170, 1, 'J', 10, 1),
(171, 1, 'J', 11, 1),
(172, 1, 'J', 12, 1),
(173, 1, 'J', 13, 1),
(174, 1, 'J', 14, 1),
(175, 1, 'J', 15, 1),
(176, 1, 'J', 16, 1),
(177, 1, 'J', 17, 1),
(178, 1, 'J', 18, 1),
(179, 1, 'J', 19, 1),
(180, 1, 'J', 20, 1),
(181, 2, 'A', 1, 1),
(182, 2, 'A', 2, 1),
(183, 2, 'A', 3, 1),
(184, 2, 'A', 4, 1),
(185, 2, 'A', 5, 1),
(186, 2, 'A', 6, 1),
(187, 2, 'A', 7, 1),
(188, 2, 'A', 8, 1),
(189, 2, 'A', 9, 1),
(190, 2, 'A', 10, 1),
(191, 2, 'A', 11, 1),
(192, 2, 'A', 12, 1),
(193, 2, 'A', 13, 1),
(194, 2, 'A', 14, 1),
(195, 2, 'A', 15, 1),
(196, 2, 'A', 16, 1),
(197, 2, 'A', 17, 1),
(198, 2, 'A', 18, 1),
(199, 2, 'A', 19, 1),
(200, 2, 'A', 20, 1),
(201, 2, 'B', 1, 1),
(202, 2, 'B', 2, 1),
(203, 2, 'B', 3, 1),
(204, 2, 'B', 4, 1),
(205, 2, 'B', 5, 1),
(206, 2, 'B', 6, 1),
(207, 2, 'B', 7, 1),
(208, 2, 'B', 8, 1),
(209, 2, 'B', 9, 1),
(210, 2, 'B', 10, 1),
(211, 2, 'B', 11, 1),
(212, 2, 'B', 12, 1),
(213, 2, 'B', 13, 1),
(214, 2, 'B', 14, 1),
(215, 2, 'B', 15, 1),
(216, 2, 'B', 16, 1),
(217, 2, 'B', 17, 1),
(218, 2, 'B', 18, 1),
(219, 2, 'B', 19, 1),
(220, 2, 'B', 20, 1),
(221, 2, 'C', 1, 1),
(222, 2, 'C', 2, 1),
(223, 2, 'C', 3, 1),
(224, 2, 'C', 4, 1),
(225, 2, 'C', 5, 1),
(226, 2, 'C', 6, 1),
(227, 2, 'C', 7, 1),
(228, 2, 'C', 8, 1),
(229, 2, 'C', 9, 1),
(230, 2, 'C', 10, 1),
(231, 2, 'C', 11, 1),
(232, 2, 'C', 12, 1),
(233, 2, 'C', 13, 1),
(234, 2, 'C', 14, 1),
(235, 2, 'C', 15, 1),
(236, 2, 'C', 16, 1),
(237, 2, 'C', 17, 1),
(238, 2, 'C', 18, 1),
(239, 2, 'C', 19, 1),
(240, 2, 'C', 20, 1),
(241, 2, 'D', 1, 1),
(242, 2, 'D', 2, 1),
(243, 2, 'D', 3, 1),
(244, 2, 'D', 4, 1),
(245, 2, 'D', 5, 1),
(246, 2, 'D', 6, 1),
(247, 2, 'D', 7, 1),
(248, 2, 'D', 8, 1),
(249, 2, 'D', 9, 1),
(250, 2, 'D', 10, 1),
(251, 2, 'D', 11, 1),
(252, 2, 'D', 12, 1),
(253, 2, 'D', 13, 1),
(254, 2, 'D', 14, 1),
(255, 2, 'D', 15, 1),
(256, 2, 'D', 16, 1),
(257, 2, 'D', 17, 1),
(258, 2, 'D', 18, 1),
(259, 2, 'D', 19, 1),
(260, 2, 'D', 20, 1),
(261, 2, 'E', 1, 1),
(262, 2, 'E', 2, 1),
(263, 2, 'E', 3, 1),
(264, 2, 'E', 4, 1),
(265, 2, 'E', 5, 1),
(266, 2, 'E', 6, 1),
(267, 2, 'E', 7, 1),
(268, 2, 'E', 8, 1),
(269, 2, 'E', 9, 1),
(270, 2, 'E', 10, 1),
(271, 2, 'E', 11, 1),
(272, 2, 'E', 12, 1),
(273, 2, 'E', 13, 1),
(274, 2, 'E', 14, 1),
(275, 2, 'E', 15, 1),
(276, 2, 'E', 16, 1),
(277, 2, 'E', 17, 1),
(278, 2, 'E', 18, 1),
(279, 2, 'E', 19, 1),
(280, 2, 'E', 20, 1),
(281, 2, 'F', 1, 1),
(282, 2, 'F', 2, 1),
(283, 2, 'F', 3, 1),
(284, 2, 'F', 4, 1),
(285, 2, 'F', 5, 1),
(286, 2, 'F', 6, 1),
(287, 2, 'F', 7, 1),
(288, 2, 'F', 8, 1),
(289, 2, 'F', 9, 1),
(290, 2, 'F', 10, 1),
(291, 2, 'F', 11, 1),
(292, 2, 'F', 12, 1),
(293, 2, 'F', 13, 1),
(294, 2, 'F', 14, 1),
(295, 2, 'F', 15, 1),
(296, 2, 'F', 16, 1),
(297, 2, 'F', 17, 1),
(298, 2, 'F', 18, 1),
(299, 2, 'F', 19, 1),
(300, 2, 'F', 20, 1),
(301, 2, 'G', 1, 1),
(302, 2, 'G', 2, 1),
(303, 2, 'G', 3, 1),
(304, 2, 'G', 4, 1),
(305, 2, 'G', 5, 1),
(306, 2, 'G', 6, 1),
(307, 2, 'G', 7, 1),
(308, 2, 'G', 8, 1),
(309, 2, 'G', 9, 1),
(310, 2, 'G', 10, 1),
(311, 2, 'G', 11, 1),
(312, 2, 'G', 12, 1),
(313, 2, 'G', 13, 1),
(314, 2, 'G', 14, 1),
(315, 2, 'G', 15, 1),
(316, 2, 'G', 16, 1),
(317, 2, 'G', 17, 1),
(318, 2, 'G', 18, 1),
(319, 2, 'G', 19, 1),
(320, 2, 'G', 20, 1),
(321, 2, 'H', 1, 1),
(322, 2, 'H', 2, 1),
(323, 2, 'H', 3, 1),
(324, 2, 'H', 4, 1),
(325, 2, 'H', 5, 1),
(326, 2, 'H', 6, 1),
(327, 2, 'H', 7, 1),
(328, 2, 'H', 8, 1),
(329, 2, 'H', 9, 1),
(330, 2, 'H', 10, 1),
(331, 2, 'H', 11, 1),
(332, 2, 'H', 12, 1),
(333, 2, 'H', 13, 1),
(334, 2, 'H', 14, 1),
(335, 2, 'H', 15, 1),
(336, 2, 'H', 16, 1),
(337, 2, 'H', 17, 1),
(338, 2, 'H', 18, 1),
(339, 2, 'H', 19, 1),
(340, 2, 'H', 20, 1),
(341, 2, 'J', 1, 1),
(342, 2, 'J', 2, 1),
(343, 2, 'J', 3, 1),
(344, 2, 'J', 4, 1),
(345, 2, 'J', 5, 1),
(346, 2, 'J', 6, 1),
(347, 2, 'J', 7, 1),
(348, 2, 'J', 8, 1),
(349, 2, 'J', 9, 1),
(350, 2, 'J', 10, 1),
(351, 2, 'J', 11, 1),
(352, 2, 'J', 12, 1),
(353, 2, 'J', 13, 1),
(354, 2, 'J', 14, 1),
(355, 2, 'J', 15, 1),
(356, 2, 'J', 16, 1),
(357, 2, 'J', 17, 1),
(358, 2, 'J', 18, 1),
(359, 2, 'J', 19, 1),
(360, 2, 'J', 20, 1),
(361, 3, 'A', 1, 1),
(362, 3, 'A', 2, 1),
(363, 3, 'A', 3, 1),
(364, 3, 'A', 4, 1),
(365, 3, 'A', 5, 1),
(366, 3, 'A', 6, 1),
(367, 3, 'A', 7, 1),
(368, 3, 'A', 8, 1),
(369, 3, 'A', 9, 1),
(370, 3, 'A', 10, 1),
(371, 3, 'A', 11, 1),
(372, 3, 'A', 12, 1),
(373, 3, 'A', 13, 1),
(374, 3, 'A', 14, 1),
(375, 3, 'A', 15, 1),
(376, 3, 'A', 16, 1),
(377, 3, 'A', 17, 1),
(378, 3, 'A', 18, 1),
(379, 3, 'A', 19, 1),
(380, 3, 'A', 20, 1),
(381, 3, 'B', 1, 1),
(382, 3, 'B', 2, 1),
(383, 3, 'B', 3, 1),
(384, 3, 'B', 4, 1),
(385, 3, 'B', 5, 1),
(386, 3, 'B', 6, 1),
(387, 3, 'B', 7, 1),
(388, 3, 'B', 8, 1),
(389, 3, 'B', 9, 1),
(390, 3, 'B', 10, 1),
(391, 3, 'B', 11, 1),
(392, 3, 'B', 12, 1),
(393, 3, 'B', 13, 1),
(394, 3, 'B', 14, 1),
(395, 3, 'B', 15, 1),
(396, 3, 'B', 16, 1),
(397, 3, 'B', 17, 1),
(398, 3, 'B', 18, 1),
(399, 3, 'B', 19, 1),
(400, 3, 'B', 20, 1),
(401, 3, 'C', 1, 1),
(402, 3, 'C', 2, 1),
(403, 3, 'C', 3, 1),
(404, 3, 'C', 4, 1),
(405, 3, 'C', 5, 1),
(406, 3, 'C', 6, 1),
(407, 3, 'C', 7, 1),
(408, 3, 'C', 8, 1),
(409, 3, 'C', 9, 1),
(410, 3, 'C', 10, 1),
(411, 3, 'C', 11, 1),
(412, 3, 'C', 12, 1),
(413, 3, 'C', 13, 1),
(414, 3, 'C', 14, 1),
(415, 3, 'C', 15, 1),
(416, 3, 'C', 16, 1),
(417, 3, 'C', 17, 1),
(418, 3, 'C', 18, 1),
(419, 3, 'C', 19, 1),
(420, 3, 'C', 20, 1),
(421, 3, 'D', 1, 1),
(422, 3, 'D', 2, 1),
(423, 3, 'D', 3, 1),
(424, 3, 'D', 4, 1),
(425, 3, 'D', 5, 1),
(426, 3, 'D', 6, 1),
(427, 3, 'D', 7, 1),
(428, 3, 'D', 8, 1),
(429, 3, 'D', 9, 1),
(430, 3, 'D', 10, 1),
(431, 3, 'D', 11, 1),
(432, 3, 'D', 12, 1),
(433, 3, 'D', 13, 1),
(434, 3, 'D', 14, 1),
(435, 3, 'D', 15, 1),
(436, 3, 'D', 16, 1),
(437, 3, 'D', 17, 1),
(438, 3, 'D', 18, 1),
(439, 3, 'D', 19, 1),
(440, 3, 'D', 20, 1),
(441, 3, 'E', 1, 1),
(442, 3, 'E', 2, 1),
(443, 3, 'E', 3, 1),
(444, 3, 'E', 4, 1),
(445, 3, 'E', 5, 1),
(446, 3, 'E', 6, 1),
(447, 3, 'E', 7, 1),
(448, 3, 'E', 8, 1),
(449, 3, 'E', 9, 1),
(450, 3, 'E', 10, 1),
(451, 3, 'E', 11, 1),
(452, 3, 'E', 12, 1),
(453, 3, 'E', 13, 1),
(454, 3, 'E', 14, 1),
(455, 3, 'E', 15, 1),
(456, 3, 'E', 16, 1),
(457, 3, 'E', 17, 1),
(458, 3, 'E', 18, 1),
(459, 3, 'E', 19, 1),
(460, 3, 'E', 20, 1),
(461, 3, 'F', 1, 1),
(462, 3, 'F', 2, 1),
(463, 3, 'F', 3, 1),
(464, 3, 'F', 4, 1),
(465, 3, 'F', 5, 1),
(466, 3, 'F', 6, 1),
(467, 3, 'F', 7, 1),
(468, 3, 'F', 8, 1),
(469, 3, 'F', 9, 1),
(470, 3, 'F', 10, 1),
(471, 3, 'F', 11, 1),
(472, 3, 'F', 12, 1),
(473, 3, 'F', 13, 1),
(474, 3, 'F', 14, 1),
(475, 3, 'F', 15, 1),
(476, 3, 'F', 16, 1),
(477, 3, 'F', 17, 1),
(478, 3, 'F', 18, 1),
(479, 3, 'F', 19, 1),
(480, 3, 'F', 20, 1),
(481, 3, 'G', 1, 1),
(482, 3, 'G', 2, 1),
(483, 3, 'G', 3, 1),
(484, 3, 'G', 4, 1),
(485, 3, 'G', 5, 1),
(486, 3, 'G', 6, 1),
(487, 3, 'G', 7, 1),
(488, 3, 'G', 8, 1),
(489, 3, 'G', 9, 1),
(490, 3, 'G', 10, 1),
(491, 3, 'G', 11, 1),
(492, 3, 'G', 12, 1),
(493, 3, 'G', 13, 1),
(494, 3, 'G', 14, 1),
(495, 3, 'G', 15, 1),
(496, 3, 'G', 16, 1),
(497, 3, 'G', 17, 1),
(498, 3, 'G', 18, 1),
(499, 3, 'G', 19, 1),
(500, 3, 'G', 20, 1),
(501, 3, 'H', 1, 1),
(502, 3, 'H', 2, 1),
(503, 3, 'H', 3, 1),
(504, 3, 'H', 4, 1),
(505, 3, 'H', 5, 1),
(506, 3, 'H', 6, 1),
(507, 3, 'H', 7, 1),
(508, 3, 'H', 8, 1),
(509, 3, 'H', 9, 1),
(510, 3, 'H', 10, 1),
(511, 3, 'H', 11, 1),
(512, 3, 'H', 12, 1),
(513, 3, 'H', 13, 1),
(514, 3, 'H', 14, 1),
(515, 3, 'H', 15, 1),
(516, 3, 'H', 16, 1),
(517, 3, 'H', 17, 1),
(518, 3, 'H', 18, 1),
(519, 3, 'H', 19, 1),
(520, 3, 'H', 20, 1),
(521, 3, 'J', 1, 1),
(522, 3, 'J', 2, 1),
(523, 3, 'J', 3, 1),
(524, 3, 'J', 4, 1),
(525, 3, 'J', 5, 1),
(526, 3, 'J', 6, 1),
(527, 3, 'J', 7, 1),
(528, 3, 'J', 8, 1),
(529, 3, 'J', 9, 1),
(530, 3, 'J', 10, 1),
(531, 3, 'J', 11, 1),
(532, 3, 'J', 12, 1),
(533, 3, 'J', 13, 1),
(534, 3, 'J', 14, 1),
(535, 3, 'J', 15, 1),
(536, 3, 'J', 16, 1),
(537, 3, 'J', 17, 1),
(538, 3, 'J', 18, 1),
(539, 3, 'J', 19, 1),
(540, 3, 'J', 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `seat_booking`
--

CREATE TABLE `seat_booking` (
  `seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `showtime`
--

CREATE TABLE `showtime` (
  `id` varchar(255) NOT NULL,
  `movie_id` varchar(255) NOT NULL,
  `theater_id` varchar(255) NOT NULL,
  `time` time NOT NULL,
  `day` date NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `theater`
--

CREATE TABLE `theater` (
  `theater_id` varchar(255) NOT NULL,
  `theater_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theater`
--

INSERT INTO `theater` (`theater_id`, `theater_no`) VALUES
('1', 1),
('2', 2),
('3', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone_no`, `is_admin`) VALUES
('7c9f5911-2901-4018-8ee7-b21f29c0dd1e', 'andrew.E', '$2b$12$ygFGQv3Po5dcC0vvxXq4OOj.cPeLLOao1xwLwTUKWw1TtFcdOgNPq', 'andrewEmil343@gamil.com', '+201204936350', 0),
('aa527f23-5514-423f-a2fd-8ae6c2e1f0b3', 'andrew_18', '$2b$12$aAMzSRxKBfCghpocvzcq6eK4yt9Qmq/jl9lJ2of8dOCvXNAvkgK4y', 'andrewemil@yahoo.com', '1023123023', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`cart_id`,`product_id`);

--
-- Indexes for table `food_categories`
--
ALTER TABLE `food_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `food_drinks`
--
ALTER TABLE `food_drinks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`seat_id`);

--
-- Indexes for table `seat_booking`
--
ALTER TABLE `seat_booking`
  ADD PRIMARY KEY (`seat_id`,`booking_id`);

--
-- Indexes for table `showtime`
--
ALTER TABLE `showtime`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `theater_id` (`theater_id`);

--
-- Indexes for table `theater`
--
ALTER TABLE `theater`
  ADD PRIMARY KEY (`theater_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_no` (`phone_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `seat_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=541;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD CONSTRAINT `movies_genres_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`),
  ADD CONSTRAINT `movies_genres_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

--
-- Constraints for table `showtime`
--
ALTER TABLE `showtime`
  ADD CONSTRAINT `showtime_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  ADD CONSTRAINT `showtime_ibfk_2` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
