<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-12">
      <div class="w-64 flex-shrink-0 hidden lg:block">
        <div class="sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
          <DocsNav :show-sections="['examples']" />
        </div>

      <div class="flex-1 min-w-0">
        <router-link to="/examples" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4 inline-flex items-center">
          <Icon name="chevron-right" class="w-4 h-4 rotate-180 mr-1" />
          Back to Examples
        </router-link>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">CSV Parser</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Parse CSV files with proper header handling and support for quoted fields.
        </p>

        <!-- Grammar -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">CSV Grammar</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            A CSV file consists of rows separated by newlines, where each row contains fields separated by commas. Fields may be quoted to include commas and newlines.
          </p>

          <CodeTabs
            :rust="grammarRust"
            :ruby="grammarRuby"
          />
        </section>

        <!-- Implementation -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Implementation</h2>

          <CodeTabs
            :rust="implementationRust"
            :ruby="implementationRuby"
          />
        </section>

        <!-- Header Handling -->
        <section class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Header Handling</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Transform rows into maps using the first row as headers.
          </p>

          <CodeTabs
            :rust="headerRust"
            :ruby="headerRuby"
          />
        </section>

        <!-- Complete Example -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Complete Example</h2>

          <CodeTabs
            :rust="completeRust"
            :ruby="completeRuby"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../components/atoms/Icon.vue'
import CodeTabs from '../components/molecules/CodeTabs.vue'
import DocsNav from '../components/organisms/DocsNav.vue'

const grammarRust = `// CSV Grammar
// file    = (row (eol row)*)?
// row     = field ("," field)*
// field   = quoted_field | unquoted_field
// quoted_field = '"' ([^"] | '""')* '"'
// unquoted_field = [^,\r\n]*

let file = row
    .separated_by(eol)
    .maybe()
    .map(|rows| rows.unwrap_or_default());

let row = field
    .separated_by(str(","))
    .map(|fields| fields);

let field = quoted_field.or(unquoted_field);

let quoted_field = str("\"")
    .then(re(r#"(?:[^"]|"")*"#).as("content"))
    .then(str("\""))
    .map(|((_, content), _)| content.replace("\"\"", "\""));

let unquoted_field = re(r"[^,\r\n]*").map(|s| s);

let eol = str("\r\n").or(str("\n")).or(str("\r"));`

const grammarRuby = `# CSV Grammar
# file    = (row (eol row)*)?
# row     = field ("," field)*
# field   = quoted_field | unquoted_field
# quoted_field = '"' ([^"] | '""')* '"'
# unquoted_field = [^,\r\n]*

file = row.separated_by(eol).maybe.map { |rows| rows || [] }

row = field.separated_by(str(",")).map { |fields| fields }

field = quoted_field | unquoted_field

quoted_field = str("\"") >>
               re('(?:[^"]|"")*').as(:content) >>
               str("\"") >>
               map { |(_, content), _| content.gsub('""', '"') }

unquoted_field = re("[^,\\r\\n]*").map { |s| s }

eol = str("\\r\\n") | str("\\n") | str("\\r")`

const implementationRust = `use parsanol::prelude::*;

let unquoted = re(r"[^,\r\n]*");

let quoted = str("\"")
    .then(re(r#"(?:[^"]|"")*"#))
    .then(str("\""))
    .map(|((_, content), _)| content.replace("\"\"", "\""));

let field = quoted.or(unquoted);

let row = field
    .separated_by(str(","))
    .map(|fields| fields);

let eol = str("\r\n").or(str("\n"));

let csv = row
    .separated_by(eol)
    .then(eol.maybe())
    .map(|(rows, _)| rows);`

const implementationRuby = `require 'parsanol'

unquoted = re("[^,\\r\\n]*")

quoted = str('"') >>
         re('(?:[^"]|"")*') >>
         str('"') >>
         transform { |(_, content), _| content.gsub('""', '"') }

field = quoted | unquoted

row = field.separated_by(str(",")).map { |fields| fields }

eol = str("\\r\\n") | str("\\n")

csv = row.separated_by(eol) >> eol.maybe >> transform { |rows, _| rows }`

const headerRust = `// Parse with headers
fn parse_csv_with_headers(input: &str) -> Result<Vec<HashMap<String, String>>, Error> {
    let rows = csv.parse(input)?;

    if rows.is_empty() {
        return Ok(vec![]);
    }

    let headers = rows[0].clone();
    let data_rows = &rows[1..];

    let records: Vec<HashMap<String, String>> = data_rows
        .iter()
        .map(|row| {
            headers.iter()
                .zip(row.iter())
                .map(|(h, v)| (h.clone(), v.clone()))
                .collect()
        })
        .collect();

    Ok(records)
}`

const headerRuby = `# Parse with headers
def parse_csv_with_headers(input)
  rows = csv.parse(input).value

  return [] if rows.empty?

  headers = rows[0]
  data_rows = rows[1..]

  data_rows.map do |row|
    headers.zip(row).to_h
  end
end`

const completeRust = `use parsanol::prelude::*;
use std::collections::HashMap;

fn main() {
    let unquoted = re(r"[^,\r\n]*");

    let quoted = str("\"")
        .then(re(r#"(?:[^"]|"")*"#))
        .then(str("\""))
        .map(|((_, content), _)| content.replace("\"\"", "\""));

    let field = quoted.or(unquoted);

    let row = field
        .separated_by(str(","))
        .map(|fields| fields);

    let eol = str("\r\n").or(str("\n"));

    let csv = row
        .separated_by(eol)
        .then(eol.maybe())
        .map(|(rows, _)| rows);

    // Example input
    let input = r#"name,age,city
John Doe,30,"New York, NY"
Jane Smith,25,"Los Angeles, CA"
"#;

    let rows = csv.parse(input).unwrap();

    println!("Parsed {} rows", rows.len());
    for row in rows {
        println!("{:?}", row);
    }
}`

const completeRuby = `require 'parsanol'

unquoted = re("[^,\\r\\n]*")

quoted = str('"') >>
         re('(?:[^"]|"")*') >>
         str('"') >>
         transform { |(_, content), _| content.gsub('""', '"') }

field = quoted | unquoted

row = field.separated_by(str(",")).map { |fields| fields }

eol = str("\\r\\n") | str("\\n")

csv = row.separated_by(eol) >> eol.maybe >> transform { |rows, _| rows }

# Example input
input = <<~CSV
name,age,city
John Doe,30,"New York, NY"
Jane Smith,25,"Los Angeles, CA"
CSV

rows = csv.parse(input).value

puts "Parsed #{rows.length} rows"
rows.each do |row|
  puts row.inspect
end

# Output:
# Parsed 3 rows
# ["name", "age", "city"]
# ["John Doe", "30", "New York, NY"]
# ["Jane Smith", "25", "Los Angeles, CA"]`
</script>
