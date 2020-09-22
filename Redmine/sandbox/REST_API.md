| description | url |
|:------------|:----|
|全チケットを一覧表示 | /issues.xml?key=XXXX |
|チケット番号2|/issues/2.xml?key=XXXX|
|プロジェクトID＝2の全チケット|/issues.xml?project_id=2&key=XXXX|
|全プロジェクト|/projects.xml?key=XXXX|
|プロジェクトID＝2のメンバー|/projects/2/memberships.xml?key=XXXX|
|全ユーザ一覧|0/users.xml?key=XXXX|
|実績工数のすべての履歴|/time_entries.xml?key=XXXX|
|チケット番号8470の関連チケット|/issues/8470/relations.xml?key=XXXX|
|fooプロジェクトの全バージョン|/projects/foo/versions.xml?key=XXXX|
|||
|||
|||
|||
|||
|||
|||
http://www.redmine.org/projects/redmine/wiki/Rest_Issues

https://www.r-labs.org/projects/r-labs/wiki/Redmine_REST_API
/*
プロジェクト指定: /issues.json?project_id={id}
ステータス制限: /issues.json?status_id={open|closed}{id}
更新日範囲指定:(*1) /issues.json?updated_on=><2012-03-01|2012-03-07
*/

ET /issues.xml?page=2&limit=100 
GET /issues.xml?page=3&limit=100 
```

# Wiki名「マニュアル」のWiki内容を表示(日本語名もOK)
http://localhost:3000/projects/foo/wiki/マニュアル.xml?key=XXXX

# カスタムクエリを一覧表示
http://localhost:3000/queries.xml?key=XXXX

# システム管理画面で作成した全ステータスを一覧表示
http://localhost:3000/issue_statuses.xml?key=XXXX

# システム管理画面で作成した全トラッカーを一覧表示
http://localhost:3000/trackers.xml?key=XXXX

# システム管理画面で作成した全ての優先度を一覧表示
http://localhost:3000/enumerations/issue_priorities.xml?key=XXXX

# システム管理画面で作成した全ての作業分類を一覧表示
http://localhost:3000/enumerations/time_entry_activities.xml?key=XXXX

# プロジェクトID＝2のカテゴリを一覧表示
http://localhost:3000/projects/2/issue_categories.xml?key=XXXX

# システム管理画面で作成した全てのロールを一覧表示
http://localhost:3000/roles.xml?key=XXXX

# システム管理画面で作成した全てのユーザグループを一覧表示
http://localhost:3000/groups.xml?key=XXXX
```
