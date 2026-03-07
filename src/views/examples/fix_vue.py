#!/usr/bin/env python3
import sys

# Read the file
with open('RustDynamicExample.vue', 'r') as f:
    content = f.read()

# Replace the problematic patterns in pre blocks
# First, find all pre blocks
import re

def escape_pre_block(match):
    content = match.group(1)
    # Escape { and } and arrows
    content = content.replace('{', '&#123;')
    content = content.replace('}', '&#125;')
    content = content.replace('->', '-&#62;')
    content = content.replace('=>', '=&#62;')
    return '<pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">' + content + '</pre>'

# Replace in the template
new_content = re.sub(
    r'<pre v-pre class="text-sm font-mono text-gray-800 dark:text-gray-200">(.*?)</pre>',
    escape_pre_block,
    content,
    flags=re.DOTALL
)

# Write back
with open('RustDynamicExample.vue', 'w') as f:
    f.write(new_content)

print("Escaped RustDynamicExample.vue")
