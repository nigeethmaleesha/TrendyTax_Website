"""Rebuild public-content snapshot after editing website pages. Python 3, no packages."""
from html.parser import HTMLParser
from pathlib import Path
import json, re
ROOT=Path(__file__).resolve().parents[1]
PAGES={'index.html':'Home','about.html':'About Us','services.html':'Services','achievements.html':'Achievements','contact.html':'Contact & FAQs','insights.html':'Insights (draft index)','insights/bookkeeping.html':'Bookkeeping (draft)','insights/cash-flow.html':'Cash flow (draft)','insights/tax-readiness.html':'Tax readiness (draft)'}
class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.main=False; self.skip=[]; self.parts=[]; self.links=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='main': self.main=True
        if not self.main: return
        if tag in {'script','style','svg','form','noscript'}: self.skip.append(tag)
        if self.skip: return
        if tag in {'h1','h2','h3','h4','p','section','li','summary','div','br'}: self.parts.append('\n')
        if tag=='a' and a.get('href','').startswith(('https://www.trendytaxsolutions.com.au/book-online','tel:','mailto:')): self.links.append(a['href'])
        if tag=='img' and a.get('alt') and 'credential' in a.get('class',''): self.parts.append(a['alt'])
    def handle_endtag(self,tag):
        if self.skip:
            if tag==self.skip[-1]: self.skip.pop()
            return
        if tag=='main': self.main=False
        if self.main and tag in {'h1','h2','h3','h4','p','li','summary','div','section','a'}: self.parts.append('\n')
    def handle_data(self,data):
        if self.main and not self.skip: self.parts.append(data+' ')
rows=[]
for path,title in PAGES.items():
    parser=Extract(); parser.feed((ROOT/path).read_text(encoding='utf-8'))
    text='\n'.join(s for x in ''.join(parser.parts).splitlines() if (s:=re.sub(r'\s+',' ',x).strip()))
    if parser.links: text+='\nOfficial links: '+', '.join(dict.fromkeys(parser.links))
    rows.append({'id':path,'title':title,'draft':path.startswith('insights/'),'text':text})
(ROOT/'lib'/'knowledge-base.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Indexed {len(rows)} pages, {sum(len(r["text"]) for r in rows)} characters')
