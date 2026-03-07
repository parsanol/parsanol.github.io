#!/usr/bin/env python3
import os
import re

# Find all Vue files
vue_files = [f for f in os.listdir('.') if f.endswith('.vue')]

fixed_count = 0

for vue_file in vue_files:
    with open(vue_file, 'r') as f:
        content = f.read()

    original_content = content

    # Escape problematic patterns in pre v-pre blocks
    def escape_pre_block(match):
        attrs = match.group(1)
        pre_content = match.group(2)

        # Check if we need to escape
        if '{ ' not in pre_content and ' }' not in pre_content and '->' not in pre_content and '=>' not in pre_content:
            return match.group(0)

        # Escape { } -> and => patterns
        escaped = pre_content.replace('{ ', '&#123; ')
        escaped = escaped.replace(' }', ' &#125;')
        escaped = escaped.replace('->', '-&#62;')
        escaped = escaped.replace('=>', '&#61;-&#62;')

        return f'<pre v-pre{attrs}>{escaped}</pre>'

    # Replace pre v-pre blocks with escaped versions
    new_content = re.sub(
        r'<pre v-pre([^>]*)>(.*?)</pre>',
        escape_pre_block,
        content,
        flags=re.DOTALL
    )

    if new_content != original_content:
        with open(vue_file, 'w') as f:
            f.write(new_content)
        fixed_count += 1
        print(f"Fixed: {vue_file}")

    else:
        # Check if this file was in the list of files needing fixes
        pass

print(f"\nTotal files fixed: {fixed_count}")
