from os import scandir
import time

def get_size(directory):
    total_size = 0
    with scandir(directory) as it:
        for entry in it:
            if entry.is_file():
                total_size += entry.stat().st_size
            elif entry.is_dir():
                total_size += get_size(entry.path)
    return total_size


