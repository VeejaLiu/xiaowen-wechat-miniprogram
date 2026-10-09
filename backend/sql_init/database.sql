# If not exist, create database
CREATE DATABASE IF NOT EXISTS xiaowen_ai DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;

USE xiaowen_ai;

# user table
create table user
(
    id                 bigint auto_increment
        primary key,
    user_id            varchar(36)                            null,
    nickname           varchar(255)                           null comment '用户昵称',
    avatar_url         varchar(500)                           null comment '用户头像地址',
    appid              varchar(255) default ''                not null comment '小程序appid',
    openid             varchar(255) default ''                not null comment '小程序openid',
    unionid            varchar(255) default ''                not null comment '小程序unionid',
    session_key        varchar(255) default ''                not null comment '小程序session_key',
    access_token       varchar(255) default ''                not null comment '小程序access_token',
    phone_code         varchar(20)                            null comment '手机区号',
    phone_number       varchar(20)                            null comment '手机号码',
    invite_code        varchar(4)                             null comment '邀请码，该用户的邀请码',
    invited_by_user_id varchar(36)                            null comment '邀请该用户的用户user_id',
    create_time        datetime     default CURRENT_TIMESTAMP not null,
    update_time        datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
)
    charset = utf8mb4;

# 为USER表添加索引, openid
ALTER TABLE `user`
    ADD INDEX `idx_openid` (`openid`);

# generate history table
CREATE TABLE `user_generate_history`
(
    `id`                 bigint(20) NOT NULL AUTO_INCREMENT,
    `user_id`            varchar(36)         DEFAULT NULL COMMENT '用户id',
    `style`              INT        NOT NULL DEFAULT 0 COMMENT '风格',
    `prompt_history_id`  BIGINT     NOT NULL COMMENT 'prompt_history表的id',
    `generate_used_time` INT        NOT NULL DEFAULT 0 COMMENT '生成所用时间,单位毫秒',
    `status`             INT        NULL     DEFAULT 0 COMMENT '生成状态',
    `notification`       INT                 DEFAULT 0 NOT NULL,
    `images`             TEXT       NOT NULL COMMENT '生成的图片objectName, 是个string数组Json',
    `is_private`         tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否私有',
    `is_starred`         tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否收藏',
    `is_deleted`         tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除',
    `create_time`        datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time`        datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

# prompt history table
CREATE TABLE `prompt_history`
(
    `id`             bigint(20) NOT NULL AUTO_INCREMENT,
    `prompt`         TEXT       NOT NULL COMMENT '生成的文案',
    `prompt_english` TEXT       NOT NULL COMMENT '生成的文案英文',
    `create_time`    datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time`    datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

# user quota table
CREATE TABLE `user_quota`
(
    `id`          bigint(20) NOT NULL AUTO_INCREMENT,
    `user_id`     varchar(36)         DEFAULT NULL COMMENT '用户id',
    `quota`       INT        NOT NULL DEFAULT 0 COMMENT '用户配额',
    `create_time` datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

# user quota history table
CREATE TABLE `user_quota_history`
(
    `id`            bigint(20)  NOT NULL AUTO_INCREMENT,
    `user_id`       varchar(36)          DEFAULT NULL COMMENT '用户id',
    `quota_before`  INT         NOT NULL COMMENT '变化前的额度',
    `quota_after`   INT         NOT NULL COMMENT '变化后的额度',
    `change_amount` INT         NOT NULL COMMENT '额度变化的数量',
    `change_type`   varchar(20) NOT NULL COMMENT '额度变化类型（例如：增加: 1、减少: 2）',
    `change_reason` varchar(255)         DEFAULT NULL COMMENT '额度变化的原因',
    `create_time`   datetime    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time`   datetime    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

# 用户反馈表 user_feedback
CREATE TABLE `user_feedback`
(
    `id`          bigint(20) NOT NULL AUTO_INCREMENT,
    `user_id`     varchar(36)         DEFAULT NULL COMMENT '用户id',
    `rate`        INT        NOT NULL DEFAULT 0 COMMENT '评分',
    `content`     TEXT       NOT NULL COMMENT '反馈内容',
    `create_time` datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_time` datetime   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

alter table prompt_history
    add generate_sd_parameters TEXT null after prompt_english;