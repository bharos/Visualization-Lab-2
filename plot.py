import csv
from config import files
from config import constants
from sampling import random_sample
from sampling import plot_elbow
from sampling import stratified_sample
from sampling import find_pca
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import matplotlib.pyplot as plt

#Read values into a dictionary
row_list = []
col_dict = {}
with open(files.csv_file, 'rt') as f:
    reader = csv.reader(f)
    firstRow = next(reader)

    print(firstRow)

    for i,rowName in enumerate(firstRow):
        col_dict[rowName] = []

    for row in reader:

        row_list.append(row)
        for i,rowName in enumerate(firstRow):
            col_dict[rowName].append(row[i])


# Perform random sampling

samples = random_sample(row_list, constants.sample_fraction*len(row_list))
print("Random sampling - Num_sampled : "+str(len(samples)))
# print(samples)

#Find optimal k value with elbow
plot_elbow(row_list)
#Perform stratified sampling


samples = stratified_sample(row_list)
print("Adaptive sampling - Num_sampled : "+str(len(samples)))


#find PCA
# pca_samples = find_pca(samples)
# print(pca_samples)
# print(euclidean_distances(pca_samples,pca_samples))
# print(euclidean_distances(pca_samples,pca_samples))
# print(cosine_similarity(pca_samples,pca_samples))



samples = np.array(samples,np.float32)
# samples = [[float(val) for val in sample] for sample in samples]

print("samples shape : ", samples.shape)

covariance_matrix = np.corrcoef(samples,rowvar=False)

print("Covariance_matrix shape : ",covariance_matrix.shape)

trace = np.trace(covariance_matrix)
print("trace = ",trace)


eigen_vals,eigen_vector = np.linalg.eigh(covariance_matrix)



x_vals = [i for i in range(1,len(eigen_vals)+1)]

print(eigen_vals.shape)

# eigen_vals = np.sort(eigen_vals)

print(eigen_vals)

print("Sum of eigen vals : ",np.sum(eigen_vals))
plt.plot(x_vals,eigen_vals,"-ro")

plt.show()

