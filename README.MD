How to get test data:

```shell
gcloud compute instances list --format=json | jq '[.[] | {name: .name, tags: .tags.items}]' | tee hosts.js
gcloud compute firewall-rules list --format=json | jq '[.[] | {sourceRanges: .sourceRanges, sourceTags: .sourceTags, targetTags: .targetTags, allowed: .allowed}]' | tee firewall.js
```
