CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    userId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (id, username, password, status, createdAt, updatedAt) VALUES
(2, 'pedro', '$2b$10$t.NP.3vvVJWOFeFSnLTnz8uLQ0R8oUU69hiMUFnJru6oIEowE4T4ky', 'active', NOW(), NOW()),
(1, 'ctrigo', '$2b$10$LNGbhsi1se49BCuchXjcZeIUhlxEjP07eFENWCLXVwD7mslmbs1S.', 'active', NOW(), NOW());

INSERT INTO tasks (id, name, done, userId, createdAt, updatedAt) VALUES
(1, 'tarea 1', FALSE, 1, NOW(), NOW()),
(2, 'tarea 2', FALSE, 1, NOW(), NOW());