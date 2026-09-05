const markets=[
 {id:"kwari",name:"Kwari Market",description:"Explore trusted shops in Kwari Market. Find quality products at the best prices.",shops:["Kwari Shoes Hub","Kwari Fashion Collection","Kwari Phone World","Blessed Stores","Elegant Corner","Diva Collections"]},
 {id:"sabon-gari",name:"Sabon Gari Market",description:"Discover registered shops and products from Sabon Gari Market.",shops:["Sabon Gari Fashion","Sabon Gari Electronics","Gari & Grains Store","Luxe Home Store"]},
 {id:"farm-center",name:"Farm Center",description:"Find farm produce, groceries, food supplies and trusted businesses.",shops:["Farm Center Foods","Fresh Produce Hub","Grains & Agro Store","Farm Center Grocers"]},
 {id:"kurmi",name:"Kurmi Market",description:"Shop fabrics, fashion, household goods and more from registered shops.",shops:["Kurmi Fabrics","Kurmi Home Store","Northern Fashion Hub","Kurmi General Store"]}
];
const products=[
 {name:"Men's Black Sneakers",price:"₦15,500",shop:"Kwari Shoes Hub",market:"kwari",icon:"👟"},
 {name:"Senator Wear",price:"₦22,000",shop:"Kwari Fashion Collection",market:"kwari",icon:"👔"},
 {name:"Smartphone",price:"₦185,000",shop:"Kwari Phone World",market:"kwari",icon:"📱"},
 {name:"Vegetable Oil 5L",price:"₦8,800",shop:"Blessed Stores",market:"kwari",icon:"🛒"},
 {name:"Ankara Fabric",price:"₦6,500",shop:"Kurmi Fabrics",market:"kurmi",icon:"🧵"},
 {name:"Fresh Tomatoes",price:"₦4,000",shop:"Fresh Produce Hub",market:"farm-center",icon:"🍅"},
 {name:"Women's Handbag",price:"₦22,000",shop:"Sabon Gari Fashion",market:"sabon-gari",icon:"👜"},
 {name:"Home Set",price:"₦35,000",shop:"Kurmi Home Store",market:"kurmi",icon:"🏠"}
];

function qs(id){return document.getElementById(id)}
function hidePages(){document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"))}
function showHome(){hidePages();qs("homePage").classList.remove("hidden");window.scrollTo(0,0)}
function showMarkets(){hidePages();qs("marketsPage").classList.remove("hidden");renderMarkets();window.scrollTo(0,0)}
function showMarket(id){const m=markets.find(x=>x.id===id);if(!m)return;hidePages();qs("marketPage").classList.remove("hidden");qs("marketCrumb").textContent=m.name;qs("marketTitle").textContent=m.name;qs("marketDescription").textContent=m.description;qs("marketStats").textContent=`${m.shops.length}+ registered shops • Browse products from local businesses`;qs("shopsTitle").textContent=`All Shops in ${m.name}`;renderShops(m);window.scrollTo(0,0)}
function showShop(marketId,shopName){const m=markets.find(x=>x.id===marketId);hidePages();qs("shopPage").classList.remove("hidden");qs("shopMarketCrumb").textContent=m.name;qs("shopCrumb").textContent=shopName;qs("shopTitle").textContent=shopName;qs("shopMeta").textContent=`${m.name} • Verified Partner`;const list=products.filter(p=>p.shop===shopName||p.market===marketId).slice(0,8);renderProducts(qs("shopProducts"),list);window.scrollTo(0,0)}
function renderMarkets(){qs("marketsGrid").innerHTML=markets.map(m=>`<article class="market-card" onclick="showMarket('${m.id}')"><div class="big-icon">🏪</div><h2>${m.name}</h2><p class="muted">${m.description}</p><strong class="green">Explore Shops →</strong></article>`).join("")}
function renderShops(m){qs("shopsGrid").innerHTML=m.shops.map((s,i)=>`<article class="shop-card" onclick="showShop('${m.id}','${s}')"><span class="verified">✓ Verified</span><div class="shop-avatar">🏪</div><h3>${s}</h3><p class="muted">Trusted local shop</p><p>⭐ ${(4.4+i%4/10).toFixed(1)} · ${20+i*15}+ Products</p><button class="buy">View Shop</button></article>`).join("")}
function renderProducts(el,list){el.innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-img">${p.icon}</div><div class="content"><strong>${p.name}</strong><p class="muted">${p.shop}</p><div class="price">${p.price}</div><p>⭐ 4.6 · Trusted seller</p><button class="buy">Add to Cart</button></div></article>`).join(""):`<p class="muted">No products listed yet.</p>`}
function searchSite(){const q=qs("searchInput").value.trim().toLowerCase();if(!q){showHome();return}hidePages();qs("searchPage").classList.remove("hidden");const results=products.filter(p=>(p.name+" "+p.shop).toLowerCase().includes(q));qs("searchSummary").textContent=`${results.length} result(s) for "${q}"`;renderProducts(qs("searchResults"),results)}
function toggleMenu(){qs("accountMenu").classList.toggle("hidden")}
function init(){renderProducts(qs("featuredGrid"),products.slice(0,4));qs("marketTabs").innerHTML=markets.map(m=>`<button class="market-tab" onclick="showMarket('${m.id}')">🏪<br>${m.name}</button>`).join("");}
init();