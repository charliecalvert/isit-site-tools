#! /usr/bin/python3

import json

# Got this here: http://stackoverflow.com/a/2835672/253576
def dict_raise_on_duplicates(ordered_pairs):
    """Reject duplicate keys."""
    duplicates = {}
    for key, value in ordered_pairs:
        dupString = "duplicate key: %r" % (key)

        if key in duplicates:
           raise ValueError(dupString)
        else:
           duplicates[key] = value
    print(len(duplicates))

def read_config():
    with open('config/ElvenConfig.json') as data_file:
        try:
            dups = json.load(data_file, object_pairs_hook=dict_raise_on_duplicates)
        except ValueError as e:
            dups = e
            print(e)
    return dups


if __name__ == '__main__':
    read_config()
