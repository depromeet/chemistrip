CREATE TABLE `trip` (
  `trip_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'usr_id',
  `firebase_token` text NOT NULL COMMENT 'firebase_token',
  `city` varchar(45) DEFAULT NULL COMMENT '여행 도시',
  `date` varchar(45) DEFAULT NULL COMMENT '여행 기간',
  `member_count` int(11) DEFAULT NULL COMMENT '원하는 동행 수',
  `member_sex` tinyint(4) DEFAULT NULL COMMENT '동행의 성별',
  PRIMARY KEY (`trip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `usr` (
  `name` varchar(45) CHARACTER SET utf8 DEFAULT '' COMMENT '회원 닉네임',
  `img` varchar(225) CHARACTER SET utf8 DEFAULT '' COMMENT '회원 사진',
  `sex` tinyint(11) DEFAULT NULL COMMENT '회원 성별',
  `age` int(11) DEFAULT NULL COMMENT '회원 나이',
  `email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '회원 메일주소',
  `passwd` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '회원 비밀번호',
  `kind_sns` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'sns 종류',
  `firebase_token` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT 'sns token',
  `firebase_session` varchar(225) COLLATE utf8_unicode_ci DEFAULT '' COMMENT 'sns token',
  `date` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '여행기간',
  `city` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '여행 도시',
  `member_count` int(11) DEFAULT NULL COMMENT '원하는 동행 수',
  `firebase_uid` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
