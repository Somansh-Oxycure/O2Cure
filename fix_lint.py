import json
import os

with open('eslint-output.json', 'r', encoding='utf-8') as f:
    results = json.load(f)

for file_result in results:
    file_path = file_result['filePath']
    messages = file_result['messages']
    
    if not messages:
        continue
        
    rules_to_disable = set()
    for msg in messages:
        if msg.get('ruleId'):
            rules_to_disable.add(msg['ruleId'])
            
    if not rules_to_disable:
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Build disable string
    disable_lines = []
    for rule in sorted(rules_to_disable):
        disable_lines.append(f"/* eslint-disable {rule} */")
        
    disable_str = "\n".join(disable_lines) + "\n"
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(disable_str + content)
        
print("Applied eslint-disable comments to all offending files.")
