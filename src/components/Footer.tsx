export default function Footer() {
  const links = [
    { name: 'Contact', href: 'https://cutechubi.mythdrop.store/contact' },
    { name: 'Terms of Service', href: 'https://cutechubi.mythdrop.store/pages/terms-of-service' },
    { name: 'Privacy Policy', href: 'https://cutechubi.mythdrop.store/pages/privacy-policy' },
    { name: 'Returns & FAQ', href: 'https://cutechubi.mythdrop.store/pages/returns-faq' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-xl font-bold tracking-tighter mb-4">SYBARIGHT</h2>
          <p className="text-gray-500 max-w-xs text-sm">Premium apparel for the modern curator. Limited drops. Infinite quality.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-black transition">Home</a></li>
            <li><a href="/lookbook" className="hover:text-black transition">Lookbook</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {links.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-black transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
