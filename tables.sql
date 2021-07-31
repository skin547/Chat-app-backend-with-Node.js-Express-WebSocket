create table users (id char(36) PRIMARY KEY, name varchar(50), email varchar(64), password varchar(64), createdAt date);
create table rooms (id char(36) PRIMARY Key, name varchar(50), createdAt date);

create table room_user ( roomId char(36), userId char(36), FOREIGN Key(roomId) REFERENCES rooms(id) ON DELETE CASCADE , FOREIGN Key(userId) REFERENCES users(id) ON DELETE CASCADE );