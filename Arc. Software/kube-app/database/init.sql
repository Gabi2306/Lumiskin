-- Create database
CREATE DATABASE simpleapp;

-- Connect to the database
\c simpleapp

-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Insert some sample data
INSERT INTO items (name, description) VALUES 
    ('Sample Item 1', 'This is the first sample item'),
    ('Sample Item 2', 'This is the second sample item'),
    ('Sample Item 3', 'This is the third sample item');