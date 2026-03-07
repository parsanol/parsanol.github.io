#!/usr/bin/env python3
import os
import re

# Find all Vue files
vue_files = [f for f in os.listdir('.') if f.endswith('.vue')]

files_to_fix = []

for vue_file in vue_files:
    with open(vue_file, 'r') as f:
        content = f.read()

    # Find pre v-pre blocks
    pre_blocks = re.findall(r'<pre v-pre[^>]*>(.*?)</pre>', content, re.DOTALL)

    for block in pre_blocks:
        # Check for unescaped { } -> or => patterns
        if '{ ' in block or ' }' in block or '->' in block or '=>' in block:
            files_to_fix.append(vue_file)
            break

if files_to_fix:
    print(f"Files needing fixes: {len(files_to_fix)}")
    for f in files_to_fix:
        print(f"  - {f}")
else:
    print("All files look good!")
