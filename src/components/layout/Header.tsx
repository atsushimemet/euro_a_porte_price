'use client';

import Link from 'next/link';
import { Search, Settings } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ios-gray-100 bg-white/80 backdrop-blur-lg dark:border-ios-gray-700 dark:bg-black/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ・タイトル */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold text-ios-blue">
              Euro a porte
            </div>
          </Link>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/search"
              className="text-sm font-medium text-ios-gray-600 hover:text-ios-blue dark:text-ios-gray-300 dark:hover:text-ios-blue transition-colors"
            >
              検索
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-ios-gray-600 hover:text-ios-blue dark:text-ios-gray-300 dark:hover:text-ios-blue transition-colors"
            >
              管理
            </Link>
          </nav>

          {/* 右側のアクション */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0"
              aria-label="検索"
            >
              <Search className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 p-0"
              aria-label="設定"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}