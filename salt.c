#include <stdio.h>
#include <sys/random.h>

int main()
{
  unsigned char buffer[32];
  if (getentropy(buffer, sizeof(buffer)) == 0)
  {
    printf("Salt: ");
    for (int i = 0; i < sizeof(buffer); i++)
    {
      printf("%02x", buffer[i]);
    }
    printf("\n");
  }
  else
  {
    perror("getentropy");
    return 1;
  }
  return 0;
}
