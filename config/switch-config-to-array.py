#! /usr/bin/python3

# Switch from associative array to standard array for ElvenImages section
# Works in Geany
# \t\t("[^"]*"):\s{
# \t\t\{\n\t\t\t"name": \1,

import re

pattern = r'\t\t("[^"]*"):\s{'
newPattern = r'\t\t{\n\t\t\t"name": \1,'
regex = re.compile(pattern)
result = ""
with open("ElvenConfig.json") as f:
    for line in f:
        result += regex.sub(newPattern, line)
    print(result)
        #result = regex.search(line)
        #if result != None:
        #    print(result.groups())

# p.match('\t\t\{\n\t\t\t"name": \1,')
