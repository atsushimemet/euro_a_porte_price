-- Euro a porte Price Database Schema

-- 国テーブル
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(3) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- アイテムテーブル
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  country_id INTEGER REFERENCES countries(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- タグテーブル（年代、状態、その他属性）
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'era', 'condition', 'other'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 価格データテーブル
CREATE TABLE price_data (
  id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES items(id),
  tag_id INTEGER REFERENCES tags(id),
  price INTEGER NOT NULL, -- 価格（円）
  era VARCHAR(20), -- 年代（例：1950s, 1960s）
  condition VARCHAR(50), -- 状態
  source_url TEXT, -- 根拠リンク（任意）
  notes TEXT, -- 備考
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- アイテム-タグ関連テーブル
CREATE TABLE item_tags (
  id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES items(id),
  tag_id INTEGER REFERENCES tags(id),
  UNIQUE(item_id, tag_id)
);

-- 管理者テーブル（固定2アカウント）
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス作成
CREATE INDEX idx_price_data_item_id ON price_data(item_id);
CREATE INDEX idx_price_data_era ON price_data(era);
CREATE INDEX idx_items_country_id ON items(country_id);
CREATE INDEX idx_item_tags_item_id ON item_tags(item_id);
CREATE INDEX idx_item_tags_tag_id ON item_tags(tag_id);

-- 初期データ挿入
INSERT INTO countries (name, code) VALUES 
  ('フランス', 'FR'),
  ('イタリア', 'IT'),
  ('イギリス', 'GB'),
  ('ドイツ', 'DE');

INSERT INTO items (name, description, country_id) VALUES 
  ('ブラックモールスキン', 'モンサンミッシェル等で使用された作業着', 1);

INSERT INTO tags (name, category) VALUES 
  ('1940s', 'era'),
  ('1950s', 'era'),
  ('1960s', 'era'),
  ('1970s', 'era'),
  ('デッドストック', 'condition'),
  ('極美品', 'condition'),
  ('美品', 'condition'),
  ('良品', 'condition');

-- 管理者アカウント（パスワードハッシュは実装時に適切に設定）
INSERT INTO admins (username, password_hash) VALUES 
  ('admin1', 'placeholder_hash_1'),
  ('admin2', 'placeholder_hash_2');