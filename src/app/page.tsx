import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Euro a porte Price
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            ユーロヴィンテージの年代別相場を直感的に確認できるサイト。
            価格は管理者が円で手動入稿し、iOSアプリ風デザインで検索・表示します。
          </p>
          <Link href="/search">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              💎 価格を検索する
            </button>
          </Link>
        </div>

        {/* 機能紹介 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
              🔍 階層検索
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              国 → アイテム → タグの3ステップで相場をシンプルに確認
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
              📊 年代別表示
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              中央値・25–75%レンジ・サンプル数・更新日を年代別カードで表示
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
              🔖 信頼性指標
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              サンプル不足や分散大は「ほぼ言い値」で明示
            </p>
          </div>
        </div>

        {/* ターゲット紹介 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">こんな方におすすめ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">🛒 バイヤー・コレクター</h3>
              <p className="text-gray-600 dark:text-gray-300">
                仕入れや購入の判断材料として相場情報を活用
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">💰 出品者</h3>
              <p className="text-gray-600 dark:text-gray-300">
                適正な価格設定のための参考データを取得
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">🏪 ショップ・メディア</h3>
              <p className="text-gray-600 dark:text-gray-300">
                記事や商品説明での相場引用に利用
              </p>
            </div>
          </div>
        </div>

        {/* 注目アイテム */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">注目アイテム</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">ブラックモールスキン</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                モンサンミッシェル等で使用された作業着
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-500">産地</span>
                  <div className="font-medium text-gray-900 dark:text-white">フランス</div>
                </div>
                <div>
                  <span className="text-gray-500">年代</span>
                  <div className="font-medium text-gray-900 dark:text-white">1940s-1970s</div>
                </div>
              </div>
              <Link href="/search">
                <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded transition duration-200">
                  価格を確認する
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}