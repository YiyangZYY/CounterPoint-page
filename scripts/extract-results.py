"""Extract main-table values from the adjacent paper; no hand-maintained scores."""
from pathlib import Path
import json
import re
source = Path(__file__).resolve().parents[2] / 'CounterPoint-paper/sec/5_experiments.tex'
text = source.read_text().split(r'\label{tab:main}', 1)[1].split(r'\end{table}', 1)[0]
rows = []
dataset = 'Cluster'
for line in text.splitlines():
    if r'\textit{HAVdb}' in line:
        dataset = 'HAVdb'
    if not re.match(r'^(GRAM|HyperGRAM|PMRL|TRIANGLE)', line):
        continue
    cells = line.split('&')
    scores = [float(re.search(r'\d+\.\d+', cell).group()) for cell in cells[1:]]
    name = re.match(r'^\w+', cells[0]).group()
    rows.append({'dataset': dataset, 'name': name, 'cp': r'\,CP' in cells[0], 'scores': scores})
assert len(rows) == 16 and all(len(r['scores']) == 5 for r in rows)
out = Path(__file__).resolve().parents[1] / 'src/results.json'
out.write_text(json.dumps(rows, indent=2) + '\n')
print(f'Extracted {len(rows)} rows from {source.name}')

# Supplementary recall-at-k and MRR table.
supp_rows = []
for line in (source.parents[1] / 'tab/extra.tex').read_text().splitlines():
    if not re.match(r'^(GRAM|HyperGRAM|PMRL|TRIANGLE)', line):
        continue
    cells = line.split('&')
    supp_rows.append({'name': re.match(r'^\w+', cells[0]).group(),
                      'cp': r'\cpup' in cells[0],
                      'scores': [float(re.search(r'\d+\.\d+', cell).group()) for cell in cells[1:]]})
assert len(supp_rows) == 8 and all(len(r['scores']) == 8 for r in supp_rows)
out.with_name('supplement.json').write_text(json.dumps(supp_rows, indent=2) + '\n')
print('Extracted 8 supplementary recall/MRR rows')
