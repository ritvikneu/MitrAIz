import copy
from llama_cpp import Llama
import logging
print("Model Loading")
llama = Llama(model_path='./model/ggml-vicuna-13B-1.1-f16.bin',n_threads=16,verbose=False)
print("Model loaded")


logging.basicConfig(filename='app.log', filemode='w')

async def giveResponse(input:str):
    stream = llama("Question: who was america's first president? Answer: ",
                   max_tokens=100,
                   echo=True,
                   stop=["\n"," Q: "])
    
    result = copy.deepcopy(stream)
    logging.info(result)
    print(result)
    return result