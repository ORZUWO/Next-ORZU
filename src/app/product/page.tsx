import Link from 'next/link'
import React from 'react'

const ProductPage = () => {
  const data = [
    { 
      id: 1, 
      name: "Premium Headphones", 
      price: 100, 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      description: "Сифати баланди садо ва дизайни эргономикӣ."
    },
    { 
      id: 2, 
      name: "Luxury Watch", 
      price: 200, 
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
      description: "Услуби классикӣ бо технологияи муосир."
    },
    { 
      id: 3, 
      name: "Smart Phone X", 
      price: 300, 
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop",
      description: "Қудрат ва зебоӣ дар дасти шумо."
    }
  ];

  return (
    <main className="flex-1 px-6 py-12 md:px-12 lg:px-24">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
          МАҲСУЛОТҲОИ <span className="text-gradient">МОШНИ</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Беҳтарин интихоб барои онҳое, ки сифат ва услубро қадр мекунанд.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((product) => (
          <Link 
            key={product.id} 
            href={`/product/${product.id}`}
            className="group relative flex flex-col overflow-hidden rounded-[32px] glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/10 hover:shadow-2xl"
          >
            <div className="relative h-[300px] w-full overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute top-5 right-5">
                <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm font-bold text-white shadow-xl">
                  ${product.price}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {product.name}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="flex items-center text-sm font-bold text-blue-400 group-hover:gap-2 transition-all">
                <span>ТАФСИЛОТ</span>
                <svg className="w-5 h-5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default ProductPage;
