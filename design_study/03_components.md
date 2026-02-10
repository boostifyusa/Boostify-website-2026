# Components Catalog

## Buttons

### Primary Action (Orange)
High visibility button for main CTAs.
```tsx
<Link
  to="/contact"
  className="inline-flex items-center justify-center px-10 py-5 bg-orange text-white text-lg font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1 w-full sm:w-auto">
  Book a Free Call
  <ArrowRight className="ml-2 h-6 w-6" />
</Link>
```

### Secondary Action (Outline)
Used for alternative actions or "Learn More".
```tsx
<Link
  to="/work"
  className="inline-flex items-center justify-center px-10 py-5 bg-white text-dark border-2 border-gray-light font-bold text-lg rounded-lg hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 w-full sm:w-auto">
  View Our Work
</Link>
```

### Text Link (With Icon)
Minimalist text link with arrow.
```tsx
<Link
  to="/services"
  className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold text-orange hover:bg-orange/5 transition-colors">
  View All Services →
</Link>
```

## Cards

### Feature/Browser Card (Portfolio)
A card styled to look like a browser window.
```tsx
<div className="bg-white rounded-xl shadow-2xl shadow-dark/10 overflow-hidden border border-gray-light transform transition-transform duration-500 hover:-translate-y-2">
  {/* Browser Header */}
  <div className="bg-gray-50 border-b border-gray-light px-4 py-3 flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-red-400/80" />
    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
    <div className="w-3 h-3 rounded-full bg-green-400/80" />
    <div className="ml-4 flex-1 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center max-w-[200px] mx-auto">
      <span className="text-[8px] text-gray-400 font-medium">example.com</span>
    </div>
  </div>
  {/* Content/Image */}
  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
    <img src="..." className="w-full h-full object-cover" />
  </div>
</div>
```

### Service/Icon Box
(Based on generic patterns likely present or reusable)
- **Icon Container**: `w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center text-orange`
- **Hover State**: `group-hover:bg-orange group-hover:text-white`

## Navigation Elements

### Navbar Container
Fixed with blur.
```tsx
<nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-light transition-all duration-300">
```

### Mobile Drawer
Full height, slides in from right.
```tsx
<div className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl md:hidden flex flex-col pt-24 px-8 border-l border-gray-light overflow-y-auto">
```
