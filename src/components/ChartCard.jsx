export default function ChartCard({ title, subtitle, icon: Icon, children }) {
  return (
    <div
      className="
                bg-(--bg)
                rounded-2xl
                border
                border-(--border)
                shadow-xl
                overflow-hidden
                flex
                flex-col
            "
    >
      {/* HEADER */}
      <div
        className="
                    px-5
                    py-4

                    border-b
                    border-(--border)

                    flex
                    justify-between
                    items-center

                    bg-(--bg)
                "
      >
        <div>
          <h3
            className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-widest
                            text-gray-500
                        "
          >
            {title}
          </h3>

          <p
            className="
                            text-[11px]
                            font-bold
                            mt-0.5
                        "
          >
            {subtitle}
          </p>
        </div>

        {Icon && <Icon size={14} className="text-gray-700" />}
      </div>

      {/* BODY */}
      <div className="p-4 h-75 w-full">{children}</div>
    </div>
  );
}
