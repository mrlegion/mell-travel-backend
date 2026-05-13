INSERT INTO accounts (id, email, password, name, bio, created_at, updated_at)
VALUES
    ('generated_user_001', 'ivan.ivanov@example.com', '$argon2id$v=19$m=65536,t=3,p=4$2NCb7l1NdRv6+Lp27E8JwQ$y+9oet2f8fwg6O7fHtR4wj4UnOGfFtz8GMWG7TmEYb8', 'Иван Иванов', 'Люблю музыку', now(), now()),
    ('generated_user_002', 'petr.petrov@example.com', '$argon2id$v=19$m=65536,t=3,p=4$2NCb7l1NdRv6+Lp27E8JwQ$y+9oet2f8fwg6O7fHtR4wj4UnOGfFtz8GMWG7TmEYb8', 'Пётр Петров', 'Активный слушатель', now(), now()),
    ('generated_user_003', 'maria.sidorova@example.com', '$argon2id$v=19$m=65536,t=3,p=4$2NCb7l1NdRv6+Lp27E8JwQ$y+9oet2f8fwg6O7fHtR4wj4UnOGfFtz8GMWG7TmEYb8', 'Мария Сидорова', 'Фанат звука', now(), now());