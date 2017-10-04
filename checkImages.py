import os
import sys

def list():
	lopezMain = '/home/charlie/temp/lopez-2016-04'
	count = 0

	for i in os.listdir(lopezMain):
		if i.endswith(".png") or i.endswith(".jpg"): 
			print i
			count += 1
			continue
		else:
			continue

	print count

def walk():
	count = 0
	# walk_dir = sys.argv[1]
	walk_dir = '/home/charlie/temp/lopez-folders'

	print('walk_dir = ' + walk_dir)

	# If your current working directory may change during script execution, it's recommended to
	# immediately convert program arguments to an absolute path. Then the variable root below will
	# be an absolute path as well. Example:
	# walk_dir = os.path.abspath(walk_dir)
	print('walk_dir (absolute) = ' + os.path.abspath(walk_dir))

	for root, subdirs, files in os.walk(walk_dir):
		print('--\nroot = ' + root)
		list_file_path = os.path.join(root, 'my-directory-list.txt')
		print('list_file_path = ' + list_file_path)

		with open(list_file_path, 'wb') as list_file:
			for subdir in subdirs:
				print('\t- subdirectory ' + subdir)

			for filename in files:
				if filename.endswith('.jpg'):
					count += 1
				file_path = os.path.join(root, filename)

				print('\t- file %s (full path: %s)' % (filename, file_path))
				list_file.write(('The file is %s' % filename).encode('utf-8'))
				list_file.write(b'\n')

	print count

def simpleWalk():
	count = 0
	# walk_dir = sys.argv[1]
	walk_dir = '/home/charlie/temp/lopez-folders'

	for root, subdirs, files in os.walk(walk_dir):

		for filename in files:
			if filename.endswith('.jpg'):
				count += 1

			print('%s' % (filename))

	print count

#walk()
#simpleWalk()
list()
