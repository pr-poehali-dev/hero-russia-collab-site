UPDATE applications SET status = 'accepted' WHERE status = 'принят';
UPDATE applications SET status = 'pending' WHERE status NOT IN ('accepted', 'rejected');
ALTER TABLE applications ALTER COLUMN status SET DEFAULT 'pending';