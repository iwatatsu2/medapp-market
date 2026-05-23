export function DeveloperCTA() {
  return (
    <section id="developer" className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-indigo-900">
      <div className="absolute -right-24 -top-24 size-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            開発者登録は今後公開予定です
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            医療の現場から生まれたWebアプリを登録して、全国の医療者に届けられるプラットフォームを準備中です。
            <br className="hidden sm:block" />
            公開時期が決まり次第お知らせします。
          </p>
        </div>
      </div>
    </section>
  );
}
