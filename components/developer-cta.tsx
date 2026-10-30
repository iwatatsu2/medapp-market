export function DeveloperCTA() {
  return (
    <section id="developer" className="surface-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            開発者登録は今後公開予定です
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            医療の現場から生まれたWebアプリを登録して、全国の医療者に届けられるプラットフォームを準備中です。
            <br className="hidden sm:block" />
            公開時期が決まり次第お知らせします。
          </p>
        </div>
      </div>
    </section>
  );
}
