#! /usr/bin/python3

# Test the ELVENCONFIG.JSON file
# BOTH THIS and validate-schema.js do the same thing and work

# test_jsonschema_unix.py
# A program to try the jsonschema Python library.
# Uses it to validate some JSON data.
# Follows the Unix convention of writing normal output to the standard 
# output (stdout), and errors to the standard error output (stderr).
# Author: Vasudev Ram
# Copyright 2015 Vasudev Ram

from __future__ import print_function
import sys
import json
import jsonschema
from jsonschema import validate

# Create the schema, as a nested Python dict, 
# specifying the data elements, their names and their types.

main = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "calvert": {
      "type": "object",
      "properties": {
        "base-dir": {
          "type": "string"
        },
        "site-dirs": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "destination-dirs": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "destination-dirs-extra": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "base": {
                "type": "string"
              },
              "extra": {
                "type": "string"
              }
            },
            "required": [
              "base",
              "extra"
            ]
          }
        }
      },
      "required": [
        "base-dir",
        "site-dirs",
        "destination-dirs",
        "destination-dirs-extra"
      ]
    },
    "elvenImages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "baseDir": {
            "type": "string"
          },
          "baseMarkdown": {
            "type": "string"
          },
          "createSmallImages": {
            "type": "boolean"
          },
          "imageDir": {
            "type": "string"
          },
          "markdownFileWithImages": {
            "type": "string"
          },
          "allImagesJsonFile": {
            "type": "string"
          },
          "notUsedDir": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "baseDir",
          "baseMarkdown",
          "createSmallImages",
          "imageDir",
          "markdownFileWithImages",
          "allImagesJsonFile",
          "notUsedDir"
        ]
      }
    }
  },
  "required": [
    "calvert",
    "elvenImages"
  ]
}

elvenImageSchema = {
    "id": "/ElvenImage",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "baseDir": {"type": "string"},
            "baseMarkdown": {"type": "string"},
            "createSmallImages": {"type": "boolean"},
            "imageDir": {"type": "string"},
            "markdownFileWithImages": {"type": "string"},
            "allImagesJsonFile": {"type": "string"},
            "notUserDir": {"type": "string"}
        },
        "required": ["Foo", "baseDir", "baseMarkdown", 'createSmallImages', 'imageDir', 'markdownFileWithImages']
    }
}

#elvenImagesSchema = {
#    "id": "/ElvenImages",
#    "type": "object",
#    "properties": {"$ref": "/ElvenImages"}
#};

schemaImages = {
    "id": "/images",
    "type": "object",
    "properties": {
        "calvert": {"type": "object"},
        "elvenImages" : {"$ref": "/ElvenImage"}
    }
}

print("Testing use of jsonschema for data validation.")
print("Using the following schema:")
print(schemaImages)
print("Pretty-printed schema:")
print(json.dumps(schemaImages, indent=4))

# The data to be validated:
# Two records OK, three records in ERROR.
data1 = \
{
    "calvert": {
        "base-dir": "/home/charlie/",
        "site-dirs": [
            "Documents/AllTest",
            "Git/CloudNotes/Assignments",
            "Git/CloudNotes/Prog270",
            "Git/CloudNotes/Isit322"
        ],
        "destination-dirs": [
            "/var/www/html/",
            "/var/www/html/Assignments/",
            "/var/www/html/Prog270/",
            "/var/www/html/Isit322/"
        ],
        "destination-dirs-extra": [
            {
                "base": "/var/www/html/",
                "extra": ""
            },
            {
                "base": "/var/www/html/Assignments/",
                "extra": "Assignments"
            }
        ]
    },
    "elvenImages": [
        {   
            "name": "doc",
            "baseDir": "The base directory where the images to be processed are found",
            "baseMarkdown": "Base string found in markdown files",
            "createSmallImages": True,
            "imageDir": "Append this to both baseDir and baseMarkdown",
            "markdownFileWithImages": "The markdown file to create",
            "allImagesJsonFile": "all-images.json",
            "notUsedDir": "Where to store images if the editor decides not to use them."
        },
        {
            "name": "california",
            "baseDir": "/var/www/html/images",
            "baseMarkdown": "https://s3.amazonaws.com/s3bucket01.elvenware.com",
            "createSmallImages": True,
            "imageDir": "/california1",
            "markdownFileWithImages": "/home/charlie/Documents/AllTest/california1.md",
            "allImagesJsonFile": "all-images-california1.json",
            "notUsedDir": "/home/charlie/temp/not-used/california1"
        }
    ]
};

with open("../config/ElvenConfig.json") as myFile:
    data=json.load(myFile)
    print("Raw input data:")
    #print(data)
    print("Pretty-printed input data:")
    print(json.dumps(data, indent=4))

    print("Validating the input data using jsonschema:")
    validate(data, main)
#for idx, item in enumerate(data):
#    try:
#        validate(item, main)
#        sys.stdout.write("Record #{}: OK\n".format(idx))
#    except jsonschema.exceptions.ValidationError as ve:
#        sys.stderr.write("Record #{}: ERROR\n".format(idx))
#        sys.stderr.write(str(ve) + "\n")
