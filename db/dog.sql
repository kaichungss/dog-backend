SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dog_click
-- ----------------------------
DROP TABLE IF EXISTS `dog_click`;
CREATE TABLE `dog_click`
(
  `id`          bigint   NOT NULL AUTO_INCREMENT,
  `dog_id`      bigint   NOT NULL,
  `operate_id`  int      NOT NULL,
  `insert_time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dog_comment
-- ----------------------------
DROP TABLE IF EXISTS `dog_comment`;
CREATE TABLE `dog_comment`
(
  `id`          int                                             NOT NULL AUTO_INCREMENT,
  `dog_id`      bigint                                          NOT NULL,
  `comment`     text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `operate_id`  bigint                                          NOT NULL,
  `insert_time` datetime                                        NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dog_favorites
-- ----------------------------
DROP TABLE IF EXISTS `dog_favorites`;
CREATE TABLE `dog_favorites`
(
  `id`          bigint   NOT NULL AUTO_INCREMENT,
  `dog_id`      bigint   NOT NULL,
  `operate_id`  bigint   NOT NULL,
  `insert_time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dog_info
-- ----------------------------
DROP TABLE IF EXISTS `dog_info`;
CREATE TABLE `dog_info`
(
  `id`          bigint                                                  NOT NULL AUTO_INCREMENT,
  `name`        varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `breed`       varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `describe`    text CHARACTER SET utf8 COLLATE utf8_general_ci         NOT NULL,
  `image`       longtext CHARACTER SET utf8 COLLATE utf8_general_ci     NOT NULL,
  `insert_time` datetime                                                NOT NULL,
  `update_time` datetime                                                NOT NULL,
  `operate_id`  bigint                                                  NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
  `id`          bigint                                                 NOT NULL AUTO_INCREMENT,
  `username`    varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email`       varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password`    varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role`        varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `insert_time` datetime                                               NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
