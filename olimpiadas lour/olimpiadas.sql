-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-09-2024 a las 22:54:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `olimpiadas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_pedidos`
--

CREATE TABLE `historial_pedidos` (
  `codigo` int(11) NOT NULL,
  `fecha_pedido` datetime DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `pedido` text DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `referencias` text DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `montoTotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `historial_pedidos`
--

INSERT INTO `historial_pedidos` (`codigo`, `fecha_pedido`, `nombre`, `pedido`, `direccion`, `referencias`, `telefono`, `correo`, `estado`, `montoTotal`) VALUES
(9, '2024-08-21 00:00:00', 'Kapi', '1 - Adidas', 'Bs as, Avellaneda, Edison, 1876', 'Es en la torre pirreO', '11', 'pablodeonce@gmail.com', 'no entregado', 20000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `codigo` int(11) NOT NULL,
  `fecha_pedido` date DEFAULT NULL,
  `nombre` varchar(32) DEFAULT NULL,
  `pedido` longtext DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `referencias` varchar(170) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `correo` varchar(60) DEFAULT NULL,
  `estado` enum('entregado','no entregado') DEFAULT NULL,
  `montoTotal` int(32) DEFAULT NULL,
  `pago` enum('no','si') DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`codigo`, `fecha_pedido`, `nombre`, `pedido`, `direccion`, `referencias`, `telefono`, `correo`, `estado`, `montoTotal`, `pago`) VALUES
(7, '2024-08-21', 'Lynn', '1 - Adidas', 'Hola, Hola, Hola, 1234', NULL, '1234567', 'ubu@gmail.cum', 'no entregado', 20000, 'no'),
(10, '2024-08-21', 'test', '2 - Nike, 1 - Adidas', 'asd, asd, test@test.com, 1345', 'casa', '12311123', 'test@test.com', 'no entregado', 280000, 'no'),
(11, '2024-09-05', 'a', '2 - Adidas, 1 - Test', 'a, a, a, a', 'null', 'a', 'a@gmail.com', 'no entregado', 40200, 'si'),
(12, '2024-09-07', 'a', '3 - Adidas, 1 - Test', 'a, a, a, a', NULL, 'a', 'a@gmail.com', 'no entregado', 60200, 'no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(32) DEFAULT NULL,
  `descripcion` varchar(62) DEFAULT NULL,
  `Categoria` varchar(32) DEFAULT NULL,
  `precio` float(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `Nombre`, `descripcion`, `Categoria`, `precio`) VALUES
(37, 'Nikes', '', '', 130000.00),
(38, 'Adidas', '', '', 100.00),
(39, 'Test', 'Test', 'Ropa', 200.00),
(40, 'hola', NULL, NULL, 12.00),
(41, '?', NULL, NULL, 1.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(32) DEFAULT NULL,
  `contrasena` varchar(32) DEFAULT NULL,
  `rol` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contrasena`, `rol`) VALUES
(15, 'Ventas01sud', 'et#00jV_Drxz', 2),
(16, 'Kapichupapi', 'miau', 1),
(17, 'Lynn', 'ubu', 1),
(18, 'Thagoo', 'abcd1234', 1),
(19, 'Kapi', 'a', 2),
(20, 'test', 'test', 1),
(21, 'qqqq', '1234', 1),
(22, 'juan', '1234', 1),
(23, 'yes', '123', 1),
(24, 'a', 'a', 1),
(25, 'b', 'l', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial_pedidos`
--
ALTER TABLE `historial_pedidos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
