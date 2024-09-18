# Documentação dos trabalhos


PP2
Inicialmente foi necessário baixar o Cmake e o MinGW para que fosse possível compilar o código e criar as imagens em C++.

Após a produção do código foi usado o "cmake -B build" no terminal para que fossem criados todos os arquivos do build para a compilação do main. Em seguida, é feito o "cmake --build build --config Release" e por fim o "build\Release\Codigo > image.ppm", sendo esta última chamada a que cria a imagem de fato.

Para a criação da primeira imagem(image1.ppm), usamos  "cam.lookfrom = point3(13,2,3);" o qual posiciona a câmera de frente as cinco bolas. Além disso, foi utilizado o "create_world(world,10);", o qual cria a imagem e com o 10 posiciona a bola de vidro na posição na qual ela se encontra.

Na criação da segunda imagem(image2.ppm), usamos o mesmo cam.lookfrom, mas alteramos o create_world para: "create_world(world,300);". Com esta alteração, a bola de vidro se movimentou para a direita, entrando na frente da bola vermelha por este ângulo de visão, o que pode ser percebido vendo a cor da bola através desta.

Já na terceira imagem(image3.ppm), alteramos em relação a imagem 2 apenas o cam.lookfrom para: "cam.lookfrom = point3(13,10,3);". Com está alteração a câmera foi movida na vertical, podendo a imagem ser vista de cima.

Por fim criamos a quarta imagem, a qual temos "cam.lookfrom = point3(13,10,10);". Em relação a terceira imagem temos apenas uma rotação do eixo da câmera na horizontal para a esquerda.

Por fim, como as imagens foram criadas .ppm, utilizamos o link a seguir para visualizá-las: https://www.cs.rhodes.edu/welshc/COMP141_F16/ppmReader.html

As imagens podem ser encontradas na pasta imagensPG.


P2 - Trabalho Prova
