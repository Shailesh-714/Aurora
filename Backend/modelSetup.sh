ollama pull llama3.1

doctors="psychatrist gynaecologist pediatrisian dermatologist"

# Loop through each item
for doc in $doctors
do
  ollama create $doc -f ./configFiles/$doc.txt
done