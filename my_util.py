import numpy as np

def filter_arguments(hyperparameters,accepted):
    newDict = dict()
    # Iterate over all the items in dictionary and filter items which has even keys
    for (key, value) in hyperparameters.items():
        # Check if key is even then add pair to new dictionary
        if key in accepted:
            newDict[key] = value
    return newDict

#D_R_params=[n_iter,10,init,pca,verbose,1,random_state,1,angle,0.5]
def decode_parameters(p,types):
    parameters = p[1:-1].split(",")
    if(len(parameters)<2):
        return {}
    parameters = np.reshape(parameters,(-1,2))
    
    ret = {}
    for p,v in parameters:
        if(not p in types.keys()):
            pass            
        elif(isinstance(types[p],list)):
            ret[p]=v
        elif(types[p]=='int'):
            ret[p]=int(v)
        elif(types[p]=='float'):
            ret[p]=float(v)
        elif(types[p]=='str'):
            ret[p]= v

    return ret