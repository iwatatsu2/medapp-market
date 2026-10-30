export function DeveloperCTA() {
  return (
    <section id="developer" className="border-t-2 border-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="kicker text-tomato">Coming Soon</p>
          <h2 className="mt-1 font-serif text-2xl font-extrabold">ほかの医療者のアプリも、ここに並ぶ予定です。</h2>
        </div>
        <p className="max-w-md text-[14px] leading-relaxed text-foreground/65">
          現場から生まれたアプリを登録できる仕組みを準備中です。公開時期が決まり次第お知らせします。
        </p>
      </div>
    </section>
  );
}
