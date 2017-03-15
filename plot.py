import csv
from config import files
from config import constants
from sampling import random_sample
from sampling import stratified_sample
from sklearn.cluster import KMeans

#Read values into a dictionary
row_list = []
col_dict = {}
with open(files.csv_file, 'rt') as f:
    reader = csv.reader(f)
    firstRow = next(reader)

    #Skip first 4 columns
    firstRow = firstRow[5:]
    print(firstRow)

    for i,rowName in enumerate(firstRow):
        col_dict[rowName] = []

    for row in reader:
        # Skip first 4 columns
        row_list.append(row[5:])
        for i,rowName in enumerate(firstRow):
            col_dict[rowName].append(row[i+5])


# Perform random sampling

samples = random_sample(row_list, constants.sample_fraction*len(row_list))
print("Num_sampled : "+str(len(samples)))
print(samples)

#Perform stratified sampling
stratified_sample(row_list)