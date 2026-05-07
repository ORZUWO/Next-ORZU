import Link from 'next/link';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Гирифтани параметрҳои URL (Логика бетағйир монд)
    const { id } = await params;

    const data = [
        { 
            id: 1, 
            name: "Premium Headphones", 
            price: 100, 
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
            description: "Сифати баланди садо ва дизайни эргономикӣ барои бароҳатии дарозмуддат. Ин гӯшмонакҳо садои тоза ва басси пурқувватро таъмин мекунанд."
        },
        { 
            id: 2, 
            name: "Luxury Watch", 
            price: 200, 
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
            description: "Услуби классикӣ бо технологияи муосир. Соати боҳашамат барои онҳое, ки вақтро қадр мекунанд ва мехоҳанд зебо ба назар расанд."
        },
        { 
            id: 3, 
            name: "Smart Phone X", 
            price: 300, 
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop",
            description: "Қудрат ва зебоӣ дар дасти шумо. Смартфони насли нав бо камераи пешрафта ва протсессори ниҳоят тез."
        }
    ];

    const product = data.find((e) => e.id === Number(id));

    return (
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24">
            {product ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full">
                    {/* Image Section */}
                    <div className="relative group overflow-hidden rounded-[40px] glass-card h-[400px] md:h-[600px]">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-40"></div>
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center">
                        <Link href="/product" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            БАҚАФ БА МАҲСУЛОТҲО
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-blue-400">${product.price}</span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest">
                                Дар анбор мавҷуд аст
                            </span>
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-slate-950 transition-all hover:bg-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:scale-95">
                                ХАРИДАН
                            </button>
                            <button className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                                ИЛОВА БА САБАД
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Маҳсулот ёфт нашуд!</h1>
                    <Link href="/product" className="text-blue-400 hover:underline font-bold">Ба рӯйхат баргаштан</Link>
                </div>
            )}
        </div>
    );
}

export default Page;

