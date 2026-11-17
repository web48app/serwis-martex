# Generator stron Martex: python3 _src/site.py  (uruchamiać z katalogu strony)
import re, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, '_src')

IDS = ["ANWiy9TKuaGRZvZj6XG8JIaQxsg5EH4U5PMdd4G0hSxThVGk_t8zndh0m91kh_t_zsp5yVTJz1c2xNlKtMeWD_N1UOaD_PCdlOPum3pT9BG5hiyYAdVM0117_fyGCsP-Jnsl9SMoKIKm","ANWiy9RyYBV1VIFLvzIp3AvIgFYM4yvlhMdHrUDYlAoYTRIg7o0Pn_bIMJKxF4tcLEFrGjRlH4eyAxOa2qTDGtF6WnFDo_8wusIwTxdq5RySQkBPqG8-tTpsHoEw1PlgzaHYsmfl2AH-K8WP9J30","ANWiy9SvQKIXMf7FhXQLwQG8IziBdZh3W4jDBiuj137gu3AQMgCBUjRHz0w8F9vwJhV7DMcDL5V3DSTGGGHGWKeRDopwzreYitM4yIyJeqkvW7QuUkZqULuh0pXKQ9_wCvsE2ozmp5FLig","ANWiy9QheW7f77sPSWj_KQb7iNS5KFa70NtBkxY1Q7rriLonUO7DEvSc0PdUAhIpQD5tbXXrP1lt1AUvwqOdlGlzSAAJrSiTt5Sq8iCohHPedgfzmVFlabCGPp7QO8U6C-VAWm68sAnFxQ","ANWiy9QcQ_LMXmbe75J9CsT4yjSfhlDegNllDeosk8r3QKObutIxNinIXwvIsMt-jpkJs4GPsziLccFz48C7Ktw7rxaAonSlw5CUKvjS-nnyk1HUAzHGH4MjSJFPo4tR21xX_tGsMTGCQ_Mbrylm","ANWiy9TA79dce1bnHYWftOt6_KlEmkg0ZvnbliS0vSxRNxTPE4RWGsS25FwP6k2SILhzcP9ec4Uw0aEUNExPpMhlGzUtqQGOtyC0wiq7GkyzeN39QIKsbR6eRY10Hi0LL2IQslXqpAg","ANWiy9SalTQ1DdoFfF5SbHaZ1EkNiq-p8RSyXn0rAIKTE1NRKlq0ShhO3_KwSJsNL0pkJk279Qd2xQnWyQcqGsewLPs2VHvmjwL_BJs-9C9rHtq0aoLbe3_K7HX7ZeSWtsIqLyAs36n6z9B1buwm","ANWiy9SjfX6mfFpaCpo1h5fOZNTkJlrchCEFesiIKK4_gJBUlfxMEfhv5BIULLeOb58BdAt4yUeoO7qs0yJ1TVZvI-H1c_1eyegH90x0aSMKgSoEeB3bXiV2lPAl5zw2nLGduRA3nmKuSACb-5tj","ANWiy9RVZhyNFJoJEhW6LK5fX0Br1_rhywQxp7xUEPLQtZDnHWIbb1Vnof51kWB2GPYCiT5W_z-Yogt4fAqnXKSvXxGyZuW1lH26Uk-RuHS4JwOsx2J7jQjn-hQma-BjRKcsFvK-CIv6fA","ANWiy9Str8XsHWrC6LjwfYidkVPlYvLk1Mc7qwibNSGKbGaBPyBzAbaJGFJVTi08bOYi7FfbK6Yf4_sHudQtFuPflQqt85X6HqsCNrh40Tm6aU2N_nSNlaszA0HP3uafdCq58iZ_RII6yQ"]

def img(i, lazy=True):
    r = f"https://lh3.googleusercontent.com/gps-cs-s/{IDS[i-1]}=w1600-k-no"
    return (f'src="img/realizacje/{i:02d}.jpg" onerror="this.onerror=null;this.src=\'{r}\'"'
            + (' loading="lazy"' if lazy else ' fetchpriority="high"') + ' referrerpolicy="no-referrer"')

CID = "10363310737192749971"
PHONE_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>'
TOKENS = {
    "{{MAPS}}": f"https://www.google.com/maps?cid={CID}",
    "{{REVIEW}}": f"https://www.google.com/maps?cid={CID}",
    "{{DIR}}": "https://www.google.com/maps/dir/?api=1&amp;destination=Serwis+Samochodowy+Martex,+Bielatowicza+5,+33-100+Tarn%C3%B3w",
    "{{WAZE}}": "https://waze.com/ul?ll=50.02672,20.9830121&amp;navigate=yes",
    "{{PHONE_ICO}}": PHONE_ICO,
    "{{SMS_ICO}}": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    "{{PIN_ICO}}": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    "{{G_ICO}}": '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
}

def fill(s):
    s = re.sub(r"\{\{P(\d+)E\}\}", lambda m: img(int(m.group(1)), False), s)
    s = re.sub(r"\{\{P(\d+)\}\}", lambda m: img(int(m.group(1))), s)
    for k, v in TOKENS.items():
        s = s.replace(k, v)
    assert "{{" not in s, [l for l in s.split("\n") if "{{" in l][:3]
    return s

NAV = [("index.html", "Start", "home"), ("uslugi.html", "Usługi", "uslugi"),
       ("o-firmie.html", "O firmie", "o-firmie"), ("index.html#opinie", "Opinie", "opinie"),
       ("kontakt.html", "Kontakt", "kontakt")]

def head(title, desc, path):
    return f'''<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#0a0a0b">
<link rel="canonical" href="https://martextarnow.pl/{path}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="https://martextarnow.pl/{path}">
<meta property="og:image" content="https://martextarnow.pl/img/og.jpg">
<meta property="og:locale" content="pl_PL">
<link rel="icon" type="image/png" href="logo_small.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Big+Shoulders+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"AutoRepair","name":"Serwis Samochodowy Martex","image":"https://martextarnow.pl/logo.png","url":"https://martextarnow.pl/","telephone":"+48605554349",
"address":{{"@type":"PostalAddress","streetAddress":"Bielatowicza 5","postalCode":"33-100","addressLocality":"Tarnów","addressCountry":"PL"}},
"geo":{{"@type":"GeoCoordinates","latitude":50.02672,"longitude":20.9830121}},
"openingHoursSpecification":[{{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"17:00"}},{{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"08:00","closes":"14:00"}}],
"hasMap":"https://www.google.com/maps?cid={CID}","areaServed":"Tarnów"}}
</script>
</head>
'''

def header(active):
    links = "\n      ".join(
        f'<a href="{h}"{" class=\"active\"" if k == active else ""}>{t}</a>' for h, t, k in NAV)
    return f'''<body data-page="{active}">

<div class="topbar">
  <div class="wrap">
    <span class="status" data-status><i></i><span data-status-text>Pn–Pt 8:00–17:00 · Sob 8:00–14:00</span></span>
    <div class="topbar__right">
      <a href="kontakt.html#dojazd">ul. Bielatowicza 5, Tarnów</a>
      <a href="tel:+48605554349">605 554 349</a>
    </div>
  </div>
</div>

<header class="nav">
  <div class="wrap">
    <a href="index.html" class="nav__logo" aria-label="Martex — strona główna"><img src="logo-martex.png" alt="Martex grupa" width="263" height="155"></a>
    <nav class="nav__links">
      {links}
    </nav>
    <a href="tel:+48605554349" class="btn btn--red nav__cta">{{{{PHONE_ICO}}}} 605 554 349</a>
    <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>
'''

FOOTER = '''
<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <img src="logo-martex.png" alt="Grupa Martex" width="263" height="155" class="foot__logo">
        <p>Serwis samochodowy w Tarnowie. Naprawa wszystkich marek samochodów osobowych i dostawczych.</p>
      </div>
      <div>
        <h4>Strona</h4>
        <ul><li><a href="index.html">Start</a></li><li><a href="uslugi.html">Usługi</a></li><li><a href="o-firmie.html">O firmie</a></li><li><a href="index.html#opinie">Opinie</a></li><li><a href="kontakt.html">Kontakt i dojazd</a></li></ul>
      </div>
      <div>
        <h4>Godziny</h4>
        <ul><li>Pn–Pt: 8:00–17:00</li><li>Sobota: 8:00–14:00</li><li>Niedziela: nieczynne</li></ul>
      </div>
      <div>
        <h4>Kontakt</h4>
        <ul><li><a href="tel:+48605554349">605 554 349</a></li><li>ul. Bielatowicza 5</li><li>33-100 Tarnów</li><li><a href="{{MAPS}}" target="_blank" rel="noopener">Wizytówka Google →</a></li></ul>
      </div>
    </div>
    <div class="foot__bottom">
      <span>© <span data-year>2026</span> Serwis Samochodowy Martex · Tarnów</span>
      <span>Projekt i wykonanie: <a href="https://web48.app" target="_blank" rel="noopener">web48.app</a></span>
    </div>
  </div>
</footer>

<div class="mbar">
  <a href="tel:+48605554349">{{PHONE_ICO}}Zadzwoń</a>
  <a href="kontakt.html#dojazd">{{PIN_ICO}}Dojazd</a>
</div>

<div class="lb" role="dialog" aria-label="Galeria">
  <button class="lb__x" aria-label="Zamknij">×</button>
  <button class="lb__p" aria-label="Poprzednie">‹</button>
  <img src="" alt="">
  <button class="lb__n" aria-label="Następne">›</button>
</div>

<script src="js/main.js"></script>
</body>
</html>
'''

def phero(photo, crumb, title_html, lead):
    return f'''
<section class="phero">
  <div class="phero__bg"><img {{{{P{photo}E}}}} alt=""></div>
  <div class="wrap">
    <nav class="crumbs"><a href="index.html">Start</a><span>/</span>{crumb}</nav>
    <h1>{title_html}</h1>
    <p class="lead">{lead}</p>
  </div>
</section>
'''

CTA = '''
<section class="cta">
  <div class="wrap rv">
    <span class="label">Coś stuka, piszczy, świeci?</span>
    <h2>Nie czekaj,<br>aż <em>stanie</em>.</h2>
    <p>Im wcześniej przyjedziesz, tym taniej wyjdzie. Zadzwoń — powiemy, kiedy możemy przyjąć auto.</p>
    <a href="tel:+48605554349" class="btn btn--red">{{PHONE_ICO}} 605 554 349</a>
  </div>
</section>
'''

def page(fname, active, title, desc, body):
    path = "" if fname == "index.html" else fname
    html = head(title, desc, path) + header(active) + "\n<main id=\"top\">\n" + body + "\n</main>\n" + FOOTER
    open(os.path.join(ROOT, fname), "w", encoding="utf-8").write(fill(html))
    print("ok", fname, len(html))

def part(name):
    return open(os.path.join(SRC, name), encoding="utf-8").read()

# ---------- strony ----------
page("index.html", "home",
     "Serwis Samochodowy Martex Tarnów — mechanik, wulkanizacja, klimatyzacja",
     "Serwis samochodowy Martex w Tarnowie (ul. Bielatowicza 5). Naprawa wszystkich marek: silniki, skrzynie biegów, elektryka, hamulce, klimatyzacja, wymiana opon i wyważanie. Tel. 605 554 349.",
     part("home.html"))

page("uslugi.html", "uslugi",
     "Usługi — Serwis Samochodowy Martex Tarnów",
     "Pełna mechanika pojazdowa w Tarnowie: skrzynie biegów, silniki, elektryka i diagnostyka, filtry i przeglądy, klimatyzacja, hamulce, wulkanizacja, zawieszenie i wydech. Wszystkie marki.",
     phero(10, "Usługi", 'Usługi<br><span class="red">od A do Z.</span>',
           "Osobówki i dostawczaki, wszystkie marki. Poniżej pełna lista tego, co robimy na co dzień — a jeśli czegoś nie ma, i tak zadzwoń.")
     + part("uslugi.html") + CTA)

page("o-firmie.html", "o-firmie",
     "O firmie — Serwis Samochodowy Martex Tarnów",
     "Serwis Samochodowy Martex z Tarnowa: 7 stanowisk, pełna mechanika, wszystkie marki. Rzetelna diagnoza, jasna wycena i naprawy w terminie. 4,8★ w Google.",
     phero(4, "O firmie", 'Serwis, do którego<br><span class="red">się wraca.</span>',
           "Warsztat przy ul. Bielatowicza 5 w Tarnowie. Siedem stanowisk, pełna mechanika i ludzie, którzy mówią wprost.")
     + part("o-firmie.html") + CTA)

page("kontakt.html", "kontakt",
     "Kontakt i dojazd — Serwis Samochodowy Martex Tarnów",
     "Serwis Samochodowy Martex, ul. Bielatowicza 5, 33-100 Tarnów. Tel. 605 554 349. Pn–Pt 8:00–17:00, sobota 8:00–14:00. Mapa i dojazd.",
     phero(3, "Kontakt", 'Kontakt<br><span class="red">i dojazd.</span>',
           "Najszybciej umówisz się telefonicznie. Drobne rzeczy — olej, klocki, żarówki — często robimy od ręki.")
     + part("kontakt.html"))
